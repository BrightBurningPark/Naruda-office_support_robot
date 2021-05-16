# Naruda - Autonomous office cleaning and delivery robot
# ... and it's multi-platformal service providing webpage

 2019-01 AJOU Univ. capstone project in Major of Software department.

making a robot which can do cleaning and delivering docs or drinks simultaneously, and Autonomously!
we only have 2~3 months, and 4 devs, and no electronics / robotics major! Yay!

it's gonna be really difficult project.

## Wiki page is [here](https://github.com/BrightBurningPark/Naruda-office_support_robot/wiki)

## Quickstart Guide

To get the source code, simply clone the repository.
```
git clone https://github.com/BrightBurningPark/Naruda-office_support_robot
```

### Prerequisites
[Python 3.6](https://www.python.org/downloads/release/python-367/),
[Node.js](https://nodejs.org/ko/),
[MySQL Server](https://dev.mysql.com/downloads/mysql/) should be installed on your system.

### Preparing Robot
* Install dependencies
```sh
pip install python-socketio[client] rplidar scipy pillow
```
* Install breezyslam and tkinter following instructions from [here](https://github.com/simondlevy/BreezySLAM) and [here](https://tkdocs.com/tutorial/install.html)

### Preparing Server
* Check MySQL database and table to store User Information
* Specify database username and password in '/web-app/src/server/config/database.js'
* Edit urls to yours from '/web-app/src/client/core/Socket.js'

### Running Server
```sh
cd web-app
npm install
npm run build
npm run server
```

### Running Robot
```sh
cd robot
python ./robot/final_version_with_server.py
```

## Project Members
- 방성호 Chief of the team / Network backend engineer
- 박준혁 Robotics SW engineer
- 김동현 Frontend UI design & development asignee
- 권태성 Project inspection maker & HW specialist
