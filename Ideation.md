# Chrome Extension Idea: Tamadoro

## Authors

Sydney Simon, Amanda Lee, Ash Fujiyama, Gabby Gu

## Problem Statement

There are a lot of productivity tools online, but not many target extrinsic motivation to incentvize users to continue using the app to increase their productivity. More specifically, people tend to use pomodoro timers with a high likelihood of taking unnecessary breaks, dropping the habit of using it, etc. Tamatimer gamifies focus time to prevent these things from happening by providing a visual progress tracker while motivating them to develop the habit of using the app to keep their Tamagotchi-inspired pet alive.

## Target Audience

* Those who need help focusing
* People working under a time crunch
* People working on a schedule
* Students studying for exams
* Millennial and early Gen-Z who used to play with Tomagochi

## Description

Tamatimer is a time management chrome extension which enhances user productivity based on the pomodoro study method. Users are encouraged to develop good productivity habits by having to choose and take care of their Tamagotchi inspired pet. Each focus session rewards users with they can use to feed their pet to keep them happy and healthy.

## Selling Points

1. Aesthetics
2. Gammification
3. Customizeable View
4. Minimal upkeep
5. Task Organization

## User Stories

1. As a student, I want to choose an egg to hatch so that I would be motivated to do work to hatch it.
2. As a user, I would like to choose a new egg so that the novelty would motivate me in the middle of the school year.
3. As a student, I would like a stopwatch feature so that I can work uninterrupted by timers.
4. As someone who is concerned about my productivity over time, I want to sum the time I have spent working so that I can track how much time spent on a single task or project.
5. As a student with multiple homework assignments, I want to track multiple tasks or assignments so that I don't neglect one task while I am currently focused on another.
6. As someone who struggles with procrastination, I want an accountability feature that would make me spread out my work over multiple days so that I am not rushing to finish by the deadline.
7. As someone with multiple things to do, I want a feature that will mark priority or urgency so that rewards and punishments scale with the importance of the task.
8. As a student, I want the timer to work like a pomodoro so that I can factor in breaks and not burn out.
9. As an animal-lover, I want food/treat mechanics for when I complete objectives so that I can use positive reinforcement for continuing to focus.
10. As someone who needs flexibility, I want to be able to change the length of the timer for focus and breaks so that I can create long and short focus sessions.
11. As a student who studies for extended periods of time, I want an option to take long breaks when I have completed a certain number of objectives
12. As an animal enthusiast, I would like to level up or grow my pet for positive motivation for working.
13. As someone who works late nights, I would like the option to toggle between light and dark mode so that I reduce my eyestrain.
14. As an educator, I would like for the mechanics to be child-friendly and fun so that I can introduce time-management to my younger students.
15. As a student, I would like to be notified when I can take a break so that I am not constantly checking the timer when it is done.
16. As a busy student, I would like to schedule study sessions in advance for certain tasks, and get notifications for when that time comes.
17. As a user, I would like switch between the sidebar and timer badge to minimize distractions while working.
18. As a student who has trouble focusing while doing homework, I want to set a daily time goal for me to do homework.
19. As a student who has an exam coming up, I want the extension to keep me on track the day before.

## Notes

Considering implementing a pop up that consists of the timer and actions to modify the timer if we have enough time but have decided to prioritize the sidebar since it contains all of the essential features of the extension.

## References & Inspiration

1. [Tamagochi](https://tamagotchi.com/)
2. [Habitica](https://habitica.com/)
3. [pomofocus](https://pomofocus.io/app)
4. [forest app](https://forestapp.cc/)

## Technical Details

### User Interface
When users open the Chrome Extension, a side bar will appear which specifies the user tasks, their current pet, and the timer they will use for productivity. There will also be an option to switch from a side bar so the extension takes up less screen space.


### API, Libraries, and Frameworks
* React
* HTML
* CSS
* JavaScript 

### Data Storage

Game mechanics (health of the pet and task organization) will be stored in local storage of user's browser.

## Project Management

### Collaboration and Task Allocation
- **Leader:** Amanda Lee
- **Manager:** Ash Fujiyama
- **Remaining Team Members:** Sydney Simon (software developer), Gabby Gu (designer)


Collaboration mode: Slack, in person conversation
Gabby will design the Tamagochi sprites and work on UI/UX elements of the extension.

### Risks and Mitigation

The amount of features is a risk, as well as the difficulty integrating them into a single product.  The natural solution would be to target the essential features first, and then iteratively add extra features.  There will be no risks associated with having API's and external storage as our extension does not make use of it.

### Milestones and Timeline

_[You have about four weeks to work on this project. During the project management, you will use an Agile methodology to manage your tasks. For now, provide your best estimate of the work done each week, from Week 1 to Week 4.]_

* Week 1: Finalize components, identify game mechanics, build mockup
* Week 2: Pet drafts, skeletons code for popup and sidebar, implement timer
* Week 3: Implement feeding pet mechanism and task manager/organizer
* Week 4: Implement notifications, polishing UI, Testing
