from gridmap import OccupancyGridMap as ogm
from a_star import a_star
from utils import plot_path
from rpslam import *
import matplotlib.pyplot as plt


class navigation:
    def __init__(self, map_path_with_name):
        self.gmap = ogm.from_png(map_path_with_name, 1)
        self.start_node = (0.0, 0.0)
        self.goal_node  = (0.0, 0.0)
        self.path       = []
        self.path_px    = []
        self.path_rally = [] #only this one is milimeter scale cordination

    def search(self, start_milimeter, goal_milimeter):
        self.start_node = (start_milimeter[0]*PPM, start_milimeter[1]*PPM)
        self.goal_node = (goal_milimeter[0]*PPM, goal_milimeter[1]*PPM)
        self.path, self.path_px = a_star(self.start_node, self.goal_node, self.gmap, movement='8N')
        self.gmap.plot()

        if self.path:
            plot_path(self.path_px)
        else:
            print('goal is not reachable')
        
        plt.show()


    def switch(x, y):
        return {(1, -1):1, (0, -1):2, (-1, -1):3, (1, 0):4, (-1, 0):6, (1, 1):7, (0, 1):8, (-1, 1):9}.get((x, y), 5)

    def extract_rally(self):
        old_direction = 5 # initial direction is 5, and direction number follows calculator number keypad
        for i in range(len(self.path)):
            if i == len(self.path)-1:
                rally_milimeter = (self.path[i][0]/PPM, self.path[i][1]/PPM)
                self.path_rally.append(rally_milimeter)
            else:
                diff_x = self.path[i][0] - self.path[i+1][0]
                diff_y = self.path[i][1] - self.path[i+1][0]
                direction = navigation.switch(diff_x, diff_y)
                if old_direction != direction:
                    rally_milimeter = (self.path[i][0]/PPM, self.path[i][1]/PPM)
                    self.path_rally.append(rally_milimeter)
                    old_direction = direction

