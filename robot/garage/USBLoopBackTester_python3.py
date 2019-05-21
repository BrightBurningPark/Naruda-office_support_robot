import usb.core
import usb.util
import array
import sys
import os

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

if __name__ == "__main__":

    # find our device
    print ('Seeking for the first NXT block')

    # seek amongst the connected USB devices and picks
    # the first brick
    NXTdevice = None
    for bus in usb.busses():
        for device in bus.devices:
            if device.idVendor == ID_VENDOR_LEGO and device.idProduct == ID_PRODUCT_NXT:

                NXTdevice = device
                break

    # Check if an NXT brick was found
    if NXTdevice is None:
        print ('Device not found')
        sys.exit( -1 )

    # get the first (and only?) configuration for the brick    
    config = NXTdevice.configurations[0]
    # get the the appropriate brick interface
    iface = config.interfaces[0][0]
    # and get the data source/sinks for the brick 
    NXTout, NXTin = iface.endpoints

    # let's open the device
    handle = NXTdevice.open()
    # and get the interface 0 all for us
    handle.claimInterface( 0 )

    # Not sure why this is here.., I do not use Windoz
    # http://code.google.com/p/nxt-python/issues/detail?id=33
    if os.name != 'nt':
        handle.reset()

    # Conform to the protocol to which the funciton ecrobot_process1ms_usb 
    #conforms to, i.e. the one of the LEGO fantom driver
    # Send two bytes: the first one is SYSTEM_COMMAND_REPLY,
    # the second is USB_ECROBOT_MODE.
    data = array.array( 'B', [SYSTEM_COMMAND_REPLY, USB_ECROBOT_MODE] )

    # We will use bulk transfers
    # This type of communication is used to transfer large bursty data.
    # The features of this type of communication are:
    # -Error detection via CRC, with guarantee of delivery.
    # -No guarantee of bandwidth or minimum latency.
    # - Stream Pipe - Unidirectional
    # -Full & high speed modes only.
    handle.bulkWrite( NXTout.address, data )
    
    # read the response from the brick
    data = handle.bulkRead( NXTin.address, len( USB_ECROBOT_SIGNATURE ) + 1 )

    # make sure the response makes sense
    if data[0] != REPLY_COMMAND or data[1:].tostring().decode('utf-8') != USB_ECROBOT_SIGNATURE:
        print ('Invalid NXT signature (', data[1:].tostring(), ')')
        sys.exit( -1 )

    # now send the string we want to be processed by the device
    while True:
        print ('Enter the string to send to the NXT block (followed by return)')
        print ('Enter stop to terminate')
        msg = input( '>> ' )

        if msg == 'stop':
            # ask USBLoopBack to disconnect
            data = array.array( 'b', list( chr( DISCONNECT_REQ ) ) )
            handle.bulkWrite( NXTout.address, data )
            break

        # otherwise let's prepare the string to submit    
        data = array.array( 'b', list( chr( COMM_STRING ).encode('ascii', 'strict') ) + list( msg.encode('ascii', 'strict') ) )

        # send it in bulk
        handle.bulkWrite( NXTout.address, data )

        # now let's wait for the brick to respond expecting 'ok' string
        # we are expecting 4 bytes in total
        data = handle.bulkRead( NXTin.address, 4 )

        if data[0] == ACK_STRING and data[1:3].tostring().decode('utf-8') == 'ok':
            print ('Acknowledgment string received from the brick')
        else:
            print (data[1:3])
            print ('No acknowledgment')
            sys.exit( -1 )
