from breezyslam.algorithms import RMHC_SLAM
from breezyslam.sensors import RPLidarA1 as LaserModel
from rplidar import RPLidar as Lidar
from roboviz import MapVisualizer
from pgm_utils import *
from scipy.interpolate import interp1d
import numpy as np

from PIL import Image
import io
import os


MAP_SIZE_PIXELS         = 800
MAP_SIZE_METERS         = 10
PPM = MAP_SIZE_PIXELS / (MAP_SIZE_METERS * 1000) #pixel per milimeter
LIDAR_DEVICE            = '/dev/ttyUSB0'

MIN_SAMPLES = 120


class narlam:
    def __init__(self):
        self.flag = 0
        self.lidar = Lidar(LIDAR_DEVICE)
        self.slam = RMHC_SLAM(LaserModel(), MAP_SIZE_PIXELS, MAP_SIZE_METERS)
        self.viz = MapVisualizer(MAP_SIZE_PIXELS, MAP_SIZE_METERS, 'SLAM')
        self.trajectory = []
        self.mapbytes = bytearray(MAP_SIZE_PIXELS * MAP_SIZE_PIXELS)
        self.iterator = self.lidar.iter_scans()
        self.previous_distances = None

        self.x      = 0.0
        self.y      = 0.0
        self.theta  = 0.0


    def slam_no_map(self, path_map_name):
        next(self.iterator)

        while True:
            if self.flag == 1:
                break

            items = [item for item in next(self.iterator)]
            distances = [item[2] for item in items]
            angles    = [item[1] for item in items]
            
            if len(distances) > MIN_SAMPLES:
                f = interp1d(angles, distances, fill_value='extrapolate')
                distances = list(f(np.arange(360)))
                self.slam.update(distances)
                self.previous_distances = distances.copy()
            
            elif self.previous_distances is not None:
                self.slam.update(self.previous_distances)
            
            self.x, self.y, local_theta = self.slam.getpos()
            local_theta = local_theta % 360
            if local_theta < 0:
                self.theta = 360 + local.theta
            else:
                self.theta = local_theta

            self.slam.getmap(self.mapbytes)
            #save map into the map directory
            #PNG format
            '''
            image = Image.frombuffer('L', (MAP_SIZE_PIXELS, MAP_SIZE_PIXELS), self.mapbytes, 'raw', 'L', 0, 1)
            image.save(path_map_name)
            '''
            #PGM format
        
        pgm_save(path_map_name, self.mapbytes, (MAP_SIZE_PIXELS, MAP_SIZE_PIXELS))

        self.lidar.stop()
        self.lidar.disconnect()


    def slam_yes_map(self, path_map_name):
        '''
        with open(path_map_name, "rb") as map_image:
            f = map_image.read()
            b = bytearray(f)
            print(len(b))
            self.slam.setmap(b)
        '''
        map_image = pgm_load(path_map_name)
        btary = map_image[0]
        self.slam.setmap(btary)

        next(self.iterator)

        while True:
            if self.flag == 1:
                break

            items = [item for item in next(self.iterator)]
            distances = [item[2] for item in items]
            angles    = [item[1] for item in items]
            
            if len(distances) > MIN_SAMPLES:
                f = interp1d(angles, distances, fill_value='extrapolate')
                distances = list(f(np.arange(360)))
                self.slam.update(distances, should_update_map = False)
                self.previous_distances = distances.copy()
            
            elif self.previous_distances is not None:
                self.slam.update(self.previous_distances, should_update_map = False)
            
            self.x, self.y, local_theta = self.slam.getpos()
            local_theta = local_theta % 360
            if local_theta < 0:
                self.theta = 360 + local.theta
            else:
                self.theta = local_theta

            self.slam.getmap(self.mapbytes)
                    

        self.lidar.stop()
        self.lidar.disconnect()


