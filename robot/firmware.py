'''
Naruda: 2019-1 AJOU Univ. major of Software department Capstone project
Robot main firmware made by "Park Jun-Hyuk" (github nickname 'BrightBurningPark').

Robot can drive by itself, localize position and direction in given map.
it can also build the map from zero.

I Love my school and the Capstone Program SO MUCH. it's true story ^^.
'''

# adding ./lib dir to use modules
import sys
sys.path.append('./lib')
# modules under lib directory
import ntdriver     # network driver
import pathengine   # shortest path finding engine
import rpslam       # BreezySLAM(tinySLAM Implementation) with RPLidar A1


def testcode():
    cmd = input('>> ')
    nxt.send(cmd)
    print(t_slam.x, t_slam.y, t_slam.theta)

def process_request():
    #TODO: code for handling request

def sweep_floor():
    #TODO: code for robovacuum-ing

def connect_all():
    nxt.connect()
    #ser.connect()

if __name__ == "__main__":
    print ('firmware started')
    
    #making instances for firmware functionality
    nxt     = ntdriver.lego_nxt()
    #ser    = ntdriver.server()
    navi    = pathengine.navigation()

    connect_all()


    t_slam = rpslam.narlam()
    t_slam.start()
    print('slam now operates')

    print('main logic starts')
    while True:
        if ser.request != None:
            process_request()
        else:
            sweep_floor()


