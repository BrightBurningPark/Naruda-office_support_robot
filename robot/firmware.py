# adding ./lib dir to use modules
import sys
sys.path.append('./lib')
# modules under lib directory
import ntdriver
import pathengine
import rpslam


def testcode():
    cmd = input('command here >> ')
    nxt.send(cmd)
    print(t_slam.x, t_slam.y, t_slam.theta)


if __name__ == "__main__":
    print ('firmware started')
    
    #making instances for firmware functionality
    nxt = ntdriver.lego_nxt()
    #ser = ntdriver.server()
    navi = pathengine.navigation()

    #network connection setup
    nxt.connect()
    # ser.connect()

    t_slam = rpslam.narlam()
    t_slam.start()
    print('slam now operates')

    while True:
        #main logic loop of Naruda Robot
        testcode();


