from breezyslam.algorithms import RMHC_SLAM
from breezyslam.sensors import RPLidarA1 as LaserModel
from rplidar import RPLidar as Lidar
from roboviz import MapVisualizer


MAP_SIZE_PIXELS     = 2500
MAP_SIZE_METERS     = 10 #10m * 10m plain
LIDAR_DEVICE        = '/dev/ttyUSB0'

MIN_SAMPLES         = 100 #default value 200, maximum 250, odroid maximum 140


class narlam:
    def __init__(self):
        self.lidar = Lidar(LIDAR_DEVICE)
        self.slam = RMHC_SLAM(LaserModel(), MAP_SIZE_PIXELS, MAP_SIZE_METERS)
        self.viz = MapVisualizer(MAP_SIZE_PIXELS, MAP_SIZE_METERS, 'SLAM MAP')
        self.trajectory = []
        self.mapbytes = bytearray(MAP_SIZE_PIXELS * MAP_SIZE_PIXELS)
        self.iterator = self.lidar.iter_scans()

        self.previous_distances = None
        self.previous_angles    = None

        self.x      = None
        self.y      = None
        self.theta  = None

    def slam_no_map(self):
        # doing slam with building maps from zero simulaneously
        next(self.iterator)

        while True:
            items = [item for item in next(self.iterator)]

            distances   = [item[2] for item in items]
            angles      = [item[1] for item in items]

            if len(distances) > MIN_SAMPLES:
                self.slam.update(distances, scan_angles_degrees=angles)
                self.previous_distances = distances.copy()
                self.previous_angles    = angles.copy()

            elif self.previous_distances is not None:
                self.slam.update(self.previous_distances, scan_angles_degrees=self.previous_angles)

            self.x, self.y, self.theta = self.slam.getpos()

            self.slam.getmap(self.mapbytes)
            
            # visualize screen should be executed on main thread, not the subthread.
            '''
            if not self.viz.display(self.x/1000., self.y/1000., self.theta, self.mapbytes):
                exit(0)
            '''

        self.lidar.stop()
        self.lidar.disconnect()


    def slam_yes_map(self):
        # doing localization only, with pre-built map image file.
        next(self.iterator)

        with open("map.png", "rb") as map_img:
            f = map_img.read()
            b = bytearray(f)
            self.slam.setmap(b)

        while True:
            items = [item for item in next(self.iterator)]

            distances   = [item[2] for item in items]
            angles      = [item[1] for item in items]

            if len(distances) > MIN_SAMPLES:
                self.slam.update(distances, scan_angles_degrees=angles, should_update_map = False)
                self.previous_distances = distances.copy()
                self.previous_angles    = angles.copy()

            elif self.previous_distances is not None:
                self.slam.update(self.previous_distances, scan_angles_degrees=self.previous_angles, should_update_map = False)

            self.x, self.y, self.theta = self.slam.getpos()

            # should this be needed in here???
            self.slam.getmap(self.mapbytes)
            
            # visualize screen should be executed on main thread, not the subthread.
            '''
            if not self.viz.display(self.x/1000., self.y/1000., self.theta, self.mapbytes):
                exit(0)
            '''

        self.lidar.stop()
        self.lidar.disconnect()



