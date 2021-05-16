from breezyslam.algorithms import RMHC_SLAM
from breezyslam.sensors import RPLidarA1 as LaserModel
from rplidar import RPLidar as Lidar
#from roboviz import MapVisualizer
from pgm_utils import *
from scipy.interpolate import interp1d
import numpy as np

from PIL import Image
import io
import os


MAP_SIZE_PIXELS         = 1000
MAP_SIZE_METERS         = 3
PPM = MAP_SIZE_PIXELS / (MAP_SIZE_METERS * 1000) #pixel per milimeter
LIDAR_DEVICE            = '/dev/ttyUSB0'

MIN_SAMPLES = 80


class narlam:
    def __init__(self):
        self.flag = 0
        self.pause = 0
        self.lidar = Lidar(LIDAR_DEVICE)
        self.slam = RMHC_SLAM(LaserModel(), MAP_SIZE_PIXELS, MAP_SIZE_METERS)
        #self.viz = MapVisualizer(MAP_SIZE_PIXELS, MAP_SIZE_METERS, 'SLAM')
        self.trajectory = []
        self.mapbytes = bytearray(MAP_SIZE_PIXELS * MAP_SIZE_PIXELS)
        self.iterator = self.lidar.iter_scans()
        self.previous_distances = None

        self.x      = 0.0
        self.y      = 0.0
        self.theta  = 0.0


    def slam_no_map(self, path_map, map_name_pgm, map_name_png):
        self.flag = 0
        self.pause = 0
        path_map_name = path_map + '/' + map_name_pgm # map for reusing

        next(self.iterator)

        while True:
            if self.flag == 1:
                break
            if self.pause == 1:
                continue

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
        
        # On SLAM thread termination, save map image in the map directory
        # PNG format(To see/pathplannig)
        image = Image.frombuffer('L', (MAP_SIZE_PIXELS, MAP_SIZE_PIXELS), self.mapbytes, 'raw', 'L', 0, 1)
        image.save(path_map + '/' + map_name_png)
        
        # PGM format(To reuse map)
        pgm_save(path_map_name, self.mapbytes, (MAP_SIZE_PIXELS, MAP_SIZE_PIXELS))

        self.lidar.stop()
        self.lidar.disconnect()


    def slam_yes_map(self, path_map, map_name):
        self.flag = 0
        self.pause = 0
        path_map_name = path_map + '/' + map_name

        map_bytearray, map_size = pgm_load(path_map_name)
        self.slam.setmap(map_bytearray)

        next(self.iterator)

        while True:
            if self.flag == 1:
                break
            if self.pause == 1:
                pass

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
            
            self.x, local_y, local_theta = self.slam.getpos()
            self.y = MAP_SIZE_METERS * 1000 - local_y
            local_theta = local_theta % 360
            if local_theta < 0:
                local_theta = 360 + local.theta
            else:
                local_theta = local_theta
            #6/11 -> we found that the vehicle's angle was reversed on the map
            self.theta = (local_theta+180)%360

            self.slam.getmap(self.mapbytes)
                    

        self.lidar.stop()
        self.lidar.disconnect()


