# toyRobot
Considering you have setup for ionic,cordova & android below are the steps to run app on android mobile.
Download the toyRobotProject folder from drive link
In Command promt Go to toyRobotProject folder
Run below commands:
1.npm install
2.ionic cordova run android

App description:
Provide values to X,Y and Face field and click 'Place Robot' button and you can see Robot placed on tabletop.
Move button will move the robot one unit ahead.
Left button(<--) will rotate robot 90deg to its left side
Right button(-->) will rotate robot 90deg to its right side
Report button will tell you the current location of robot on tabletop
You can see scrolling logs for every button clicked.

Test data:
1. Place 0,0,EAST
Move
Report	

Output:1,0,EAST

2. Place 2,2,NORTH
Move
Move
Move
Move
Report

Output: 2,4,NORTH

3.Place 4,3,EAST
Left
Move
Left
Move
Right
Move
Report

Output:3,4,NORTH
