from gridmap import OccupancyGridMap as ogm
from a_star import a_star
from utils import plot_path
import matplotlib.pyplot as plt

class navigation:
    def __init__(self):
        self.gmap = ogm.from_png('/home/odroid/capdi/maps/example_map_occupancy.png', 1)
        self.start_node = (0.0, 0.0)
        self.goal_node = (0.0, 0.0)

    def search(self, start, goal):
        self.start_node = start
        self.goal_node = goal
        path, path_px = a_star(self.start_node, self.goal_node, gmap, movement='8N')
        
        if path == None:
            print('goal is not reachable')

        return path#,path_px
