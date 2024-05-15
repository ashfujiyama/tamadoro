# Tamatimer
Tamatimer is a time management chrome extension which enhances user productivity based on the pomodoro study method. Users are encouraged to develop good productivity habits by having to choose and take care of their Tamagotchi inspired pet. Each focus session rewards users with they can use to feed their pet to keep them happy and healthy.

# Landing Page
https://gabby-gu.github.io/tamadoro-landing-page/

## Features
* Pomodoro timer with focus, break, and long break mode
* Timer functions: adjust pomodoro duration before running, start/pause button, reset button
* Tasks can be added to sidebar with some functionality to denote what users are working on
* Ability to allocate goals to these tasks (hours/day)
* Virtual pet to motivate users
* Food and inventory implementation along with a feeding functionaility to keep the pet alive

# Screenshots
This screenshot shows with sidebard open in focus mode with a task of CIS 350 selected. The current progress is 0/60 minutes since the timer has not been run yet, but will update when user completes a focus mode. You can also see the food inventory which will be used to feed the pet after completing your task goals.

<img width="409" alt="Screenshot 2024-05-14 at 11 17 53 PM" src="https://github.com/ashfujiyama/team14/assets/114324180/cf9cbb17-3005-43b3-8dd1-450458ca77c9">

# Installation from Source 
1. Clone the repository:
```
git clone https://github.com/ashfujiyama/team14.git
```

2. Install dependencies:
```
cd TEAM14
npm install
```

3. Build the extension:
```
npm run build
```

4. Load the extension in Chrome:
* Open Chrome and navigate to chrome://extensions
* Enable "Developer mode"
* Click "Load unpacked" and select the dist directory from the project


# Usage
* Open the chrome extesion by ckicking on the "T" icon which can be seen in the top right in the image above.
* Create a task you want to work on by clicking the add task button. Input the task name and the amount of hours/minutes you want to spend on it. Select the task just made.
* If you want to change the duration of the focus mode use the up or down arrows and press the start button.
* Once focus mode is complete you will receive food. To feed the pet select the item you would like to feed it and press the feed button.

# Ideas for Enhancements
* Add an importance level to each task which can determine how much food is received
* Pet interactions with click and hover
* Reminder to do a project if you haven't focused on it yet
* Have health of pet affect appearance of pet
* Add more pet options
* Notification when a timer ends
* Option to switch betweeen stopwatch and pomodoro
  
