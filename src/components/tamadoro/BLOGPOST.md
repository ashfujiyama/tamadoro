# Post-Mortem Analysis: Tamatimer

## Introduction
Building Tomatimer was an exciting yet challenging project. The goal was to create a timer that helps users manage their time 
effectively using the Pomodoro Technique. We also wanted Tamatimer to gamify focus time and implemented this with the use of a
pet that users keep alive. Throughout the development process, several lessons were learned as we decided which features to implement, 
what tech stack to use, and what each teammate's roles would be.

# Planning Process
Before diving into development, we took the time to plan the various aspects of Tamatimer we wanted to implement. 
We brainstormed and listed out all the features we envisioned, including customizable timer durations, pause functionality, and 
mode switching. Additionally, we explored the idea of incorporating gamification elements, such as taking care of a virtual pet 
to make the timer experience more engaging. With a clear roadmap in place, we selected React as our frontend framework and Chrome 
Storage for data storage  based on teammate experience and the needs of the project. Since we are storing little data other than 
user input, local chrome storage was the best option as opposed to using an external database.

# Essentials Decisions
**Feature Selection:** The decision to include features like customizable timer durations, pause functionality, and mode switching 
was based on the core principles of the Pomodoro Technique. We also decided to include gamification features like feeding the pet and 
updating health to ensure we have an extrinsic motivational factor. We realized that with the time constraints and constraint in team 
abilities, we needed to focus on the features that were most essential for our chrome extension. 

**Technology Stack:** Our decision to use React and Chrome Storage was driven by familiarity and efficiency. We wanted to leverage reliable
technologies that would ensure seamless performance and user satisfaction.

# Lessons Learned
**Open Communication is Essential**: Open Communication: Maintaining open and frequent communication among team members was essential 
for the success of Tamatimer. Regular meetings and updates allowed us to stay aligned, address challenges, and celebrate milestones together.
**Adaptability is Important: **We quickly realized that not all of the features envisioned would be executable so we had to narrow down our 
feature selections. Some of the features we did not include is switching your pet, user settings to include duration and a stopwatch feature,
and pet interaction. With the final features that we decided to focus on, we no longer saw a need to have both a sidebar and a popup window. 
Because of the need for the pet and task selection, we decided to only work on a sidebar to implement these necessary features.

# Challenges
We struggled with integrating local chrome storage with the code to enable timer persistence and storage of essential timer variables. 
The variables were not being reset properly after reopening the chrome extension. To fix this problem we implemented a DFA like structure
to solidify state management involving extension unmounting. See the below image for the state breakdown. 

<img width="400" alt="Screenshot 2024-05-15 at 11 18 52 AM" src="https://github.com/ashfujiyama/team14/assets/114324180/c6d292cf-32da-4aea-a087-41b4f1b022ca">


