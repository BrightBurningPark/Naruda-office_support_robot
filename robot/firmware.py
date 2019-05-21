'''
Naruda: 2019-1 AJOU Univ. major of Software department Capstone project
Robot main firmware made by "Park Jun-Hyuk" (github nickname 'BrightBurningPark').

Robot can drive by itself, localize position and direction in given map.
it can also build the map from zero.

I Love my school and the Capstone Program SO MUCH. it's true story ^^.
'''
# python basic or pip-installed library import
import sys
import math
import time
import threading

# adding ./lib dir to use modules
import sys
sys.path.append('./lib')
# modules under lib directory
import ntdriver     # network driver
import pathengine   # shortest path finding engine
import rpslam       # BreezySLAM(tinySLAM Implementation) with RPLidar A1


#global var used over firmware and libs
MAP_FILE_DIR = '/home/odroid/capdi/robot/maps/'


def testcode():
    cmd = input('>> ')
    nxt.send(cmd)
    print(slamjam.x, slamjam.y, slamjam.theta)

def drive(start, goal):
    print('start from start')
    for rp in navi.path_rally:
        dx = rp[0]-slamjam.x
        dy = rp[1]-slamjam.y
        while math.hypot(dx, dy) <= 10:
            rad = math.atan(dy/dx)
            deg = rad*(180/math.pi)
            if deg > slamjam.theta:
                nxt.send(RIGHT)
            elif deg < slamjam.theta:
                nxt.send(LEFT)
            #go forward, and turn left or right till the angle of head is similar to destination
            nxt.send(FORWARD)
        nxt.send(STOP)
    print('arrived to destination')

def handle_request():
    #TODO: code for handling request. request stored in server instance
    
    # start position -> destination 1
    navi.search((slamjam.x, slamjam.y), ser.req[0])
    navi.extract_rally()
    drive()
            
    # destination 1 -> destination 2
    navi.search((slamjam.x, slamjam.y), ser.req[1])
    navi.extract_rally()
    drive()

def sweep_floor():
    #TODO: code for robovacuum-ing
    print("sweep sweep sweep")
    print(slamjam.x, slamjam.y, slamjam.theta)

def connect_all():
    nxt.connect()
    ser.connect()


if __name__ == "__main__":
    print ('firmware started')
    
    #making instances for firmware functionality
    nxt     = ntdriver.lego_nxt()
    ser     = ntdriver.server()
    navi    = pathengine.navigation(MAP_FILE_DIR)

    connect_all()


    slamjam = rpslam.narlam()
    #TODO: make this code giving ways to select yes_slam or no_slam 
    t_slam = threading.Thread(target=slamjam.slam_no_map, args=())
    t_slam.start()
    print('slam now operates')

    print('main logic starts')
    while True:
        if ser.request != None:
            handle_request()
        else:
            sweep_floor()


