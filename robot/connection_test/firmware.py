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
sys.path.append('./')
# modules under lib directory
import ntdriver     # network driver

def handle_request(path_map_name):
    #TODO: code for handling request. request stored in server instance
    # request has 3 args: 
    #       1. destination 1 (x1, y1)
    #       2. destination 2 (x2m y2)
    #       3. request Authentification pattern(4-length pattern consists of A, B, C -> used to lock the cargo)
    
    # start position -> destination 1
            
    # destination 1 -> destination 2

    # test_code
    print(path_map_name)

def connect_all():
    ser.connect()


if __name__ == "__main__":
    print ('firmware started')

    ser = ntdriver.server()

    connect_all()

    while True:
        if ser.request != None:
            print('request detected.')
            print(ser.request)
        else:
            pass


