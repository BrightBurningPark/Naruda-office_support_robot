import usb.core
import usb.util
import array
import sys
import os
import socketio
import time

class server:
    SERVER_ADDR = 'http://13.209.49.139:3000'
    sio = socketio.Client()

    def __init__(self):
        request = None

    def connect(self):
        server.sio.connect(server.SERVER_ADDR)

    def report_position(self, slam_core):
        # report current position to the server periodically
        # period is... about 500ms.
        server.sio.emit('position', [slam_core.x, slam_core.y])
        time.sleep(0.5)

    def report_progress(self):
        #TODO: need some discussion
        pass

    @sio.on('connect')
    def on_connect():
        print('connected to server')

    @sio.on('message')
    def on_message(data):
        print(data)
        print('default message received')

    @sio.on('request')
    def on_request(req):
        if self.request == None:
            print('received request from server')
            self.reqest = req
        else:
            print('already busy!')
            #TODO: maybe... sending ack?

    @sio.on('disconnect')
    def on_disconnect():
        print('disconnected from server')


# Vendor and product identifiers for the brick
ID_VENDOR_LEGO = 0x0694
ID_PRODUCT_NXT = 0x0002

#NXT Protocol
# Sends a command to the brick and expects a reply
SYSTEM_COMMAND_REPLY = 0x01
# Replied command after SYSTEM_COMMAND_REPLY 
REPLY_COMMAND = 0x02
# Signals to the brick that the remote is 
# operating in robot mode
USB_ECROBOT_MODE = 0xFF
# Signature from the brick that acknowledges
# the robo mode
USB_ECROBOT_SIGNATURE = 'ECROBOT'

# Remote wants to disconnect from the brick 
DISCONNECT_REQ = 0xFF
# Next bytes belong to the string
COMM_STRING = 0x01
# Acknowledgment from USBLoopBack
ACK_STRING = 0x02


#command protocol for robot harware control  automation
STOP        = '0'
FORWARD     = '1'
BACKWARD    = '2'
LEFT        = '3'
RIGHT       = '4'

class lego_nxt:
    def __init__(self):
        self.NXTdevice = None        

    def connect(self):
        # find our device
        print ('Seeking for the first NXT block')

        # seek amongst the connected USB devices and picks
        # the first brick
        for bus in usb.busses():
            for device in bus.devices:
                if device.idVendor == ID_VENDOR_LEGO and device.idProduct == ID_PRODUCT_NXT:
                    self.NXTdevice = device
                    break

        # Check if an NXT brick was found
        if self.NXTdevice is None:
            print ('Device not found')
            sys.exit( -1 )

        # get the first (and only?) configuration for the brick    
        self.config = self.NXTdevice.configurations[0]
        # get the the appropriate brick interface
        self.iface = self.config.interfaces[0][0]
        # and get the data source/sinks for the brick 
        self.NXTout, self.NXTin = self.iface.endpoints

        # let's open the device
        self.handle = self.NXTdevice.open()
        # and get the interface 0 all for us
        self.handle.claimInterface( 0 )

        if os.name != 'nt':
            self.handle.reset()

        self.data = array.array( 'B', [SYSTEM_COMMAND_REPLY, USB_ECROBOT_MODE] )

        self.handle.bulkWrite( self.NXTout.address, self.data )
        
        # read the response from the brick
        self.data = self.handle.bulkRead( self.NXTin.address, len( USB_ECROBOT_SIGNATURE ) + 1 )

        # make sure the response makes sense
        if self.data[0] != REPLY_COMMAND or self.data[1:].tostring().decode('utf-8') != USB_ECROBOT_SIGNATURE:
            print ('Invalid NXT signature (', self.data[1:].tostring(), ')')
            sys.exit( -1 )

        print('connection established')


    def send(self, message):
        #function that sends message to nxt and receives ack from it
        self.msg = message

        if self.msg == 'terminate':
            # ask USBLoopBack to disconnect
            self.data = array.array( 'B', list( chr( DISCONNECT_REQ ).encode() ) )
            self.handle.bulkWrite( self.NXTout.address, self.data )
            return

        # otherwise let's prepare the string to submit    
        self.data = array.array( 'B', list( chr( COMM_STRING ).encode() ) + list( self.msg.encode() ) )

        # send it in bulk
        self.handle.bulkWrite( self.NXTout.address, self.data )

        # now let's wait for the brick to respond expecting 'ok' string
        # we are expecting 4 bytes in total
        self.data = self.handle.bulkRead( self.NXTin.address, 4, timeout = 5000)

        if self.data[0] == ACK_STRING and self.data[1:3].tostring().decode('utf-8') == 'ok':
            #print ('Acknowledgment string received from the brick')
            pass
        else:
            print (self.data[1:3])
            print ('No acknowledgment')
            sys.exit( -1 )
