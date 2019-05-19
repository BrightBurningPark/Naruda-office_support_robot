from gridmap import OccupancyGridMap as ogm
from a_star import a_star
from utils import plot_path
import matplotlib.pyplot as plt

class navigation:
    def __init__(self, map_dir):
        self.gmap = ogm.from_png(map_dir+'map.png', 1)
        self.start_node = (0.0, 0.0)
        self.goal_node  = (0.0, 0.0)
        self.path       = []
        self.path_px    = []
        self.path_rally = []

    def search(self, start, goal):
        self.start_node = start
        self.goal_node = goal 
        self.path, self.path_px = a_star(self.start_node, self.goal_node, self.gmap, movement='8N')
        if self.path == None:
            print('goal is not reachable')

    def switch(x, y):
        return {(1, -1):1, (0, -1):2, (-1, -1):3, (1, 0):4, (-1, 0):6, (1, 1):7, (0, 1):8, (-1, 1):9}.get((x, y), 5)

    def extarct_rally(self):
        old_direction = 5 # initial direction is 5, and direction number follows number keypad
        for i in range(len(self.path)):
            if i == len(self.path)-1:
                self.path_rally.append(self.path[i])
            else:
                diff_x = self.path[i][0] - self.path[i+1][0]
                diff_y = self.path[i][1] - self.path[i+1][0]
                direction = navigation.switch(diff_x, diff_y)
                if old_direction != direction:
                    self.path_rally.append(self.path[i])
                    old_direction = direction

