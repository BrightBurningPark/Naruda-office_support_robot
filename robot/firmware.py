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

# General variables like Path, Var, Name, etc...
PATH_ROBOT = "/home/odroid/capdi/robot" # robot SW top path
PATH_MAP = PATH_ROBOT + "/map"          # map directory
PATH_LIB = PATH_ROBOT + "/lib"          # libraries
MAP_NAME_NO_SLAM = 'MAP_NO_SLAM.png'    # map name generated by no_map_slam
MAP_NAME_YES_SLAM = 'MAP_YES_SLAM.png'  # map name pre-drawn

flag_slam_yn = None


def testcode():
    # test code : manual serial input testing
    cmd = input('>> ')
    nxt.send(cmd)
    print(narslam.x, narslam.y, narslam.theta)

def drive_through_rally(start, goal):
    print('starting from start')
    for rp in navi.path_rally:
        dx = rp[0]-narslam.x
        dy = rp[1]-narslam.y
        while math.hypot(dx, dy) <= 10:
            rad = math.atan(dy/dx)
            deg = rad*(180/math.pi)
            if deg > -narslam.theta + 10:
                nxt.send(RIGHT)
            elif deg < -narslam.theta - 10:
                nxt.send(LEFT)
            else:
                nxt.send(FORWARD)
        nxt.send(STOP)
    print('arrived to destination')

def handle_request(path_map_name):
    #TODO: code for handling request. request stored in server instance
    # request has 3 args: 
    #       1. destination 1 (x1, y1)
    #       2. destination 2 (x2m y2)
    #       3. request Authentification pattern(4-length pattern consists of A, B, C -> used to lock the cargo)
    
    # start position -> destination 1
    navi.search(path_map_name, (narslam.x, narslam.y), ser.req[0])
    navi.extract_rally()
    drive_through_rally()
            
    # destination 1 -> destination 2
    navi.search(path_map_name, (narslam.x, narslam.y), ser.req[1])
    navi.extract_rally()
    drive_through_rally()

def sweep_floor():
    #TODO: code for robovacuum-ing
    print("sweep sweep sweep")
    print(narslam.x, narslam.y, narslam.theta)


def connect_all():
    # connecting functions comes here. there should be exception handling, but i have no time.
    nxt.connect()
    ser.connect()


if __name__ == "__main__":
    print ('firmware started')
    

    nxt         = ntdriver.lego_nxt()
    ser         = ntdriver.server()
    navi        = pathengine.navigation()
    narslam     = rpslam.narlam()
    print('instances generated successfully from the library modules')


    connect_all()
    print('all connection established')


    flag_slam_yn = input('select SLAM mode (y: do slam with pre-set map / n: do real SLAM) >> ') 
    if flag_slam_yn == 'y':
        #TODO: do yes map slam
        path_map_name = PATH_MAP + '/' + MAP_NAME_YES_SLAM
        t_slam = threading.Thread(target=narslam.slam_yes_map, args = (path_map_name,))
    elif flag_slam_yn == 'n':
        #TODO: do no map slam
        path_map_name = PATH_MAP + '/' + MAP_NAME_NO_SLAM
        t_slam = threading.Thread(target=narslam.slam_no_map, args = (path_map_name,))
    else:
        print('invalid input')
        sys.exit(-1)
    t_slam.start()
    print('SLAM now operating in background')

    t_report_pos = threading.Thread(target=ser.report_position, args = (narslam,))
    t_report_pos.start()
    print('now robot is reporting position to the server')

    print('main loop starts: it checks the request from server and do cleaning or delivery')
    while True:
        if ser.request != None:
            print('request detected.')
            handle_request()
        else:
            print('no request... but i cant be free.')
            sweep_floor()


