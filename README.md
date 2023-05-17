# SFU Synapse
### _Social Networking Web Application for SFU students_
Members
- Risa.K, 
- Nathan.L
- Jason.N
- Rachel.S

~~Link to application: http://34.30.167.71/
<br>
Development version: https://20230322t232139-dot-sfu-synapse.uc.r.appspot.com/~~
<br>
GitLab url: *https://csil-git1.cs.surrey.sfu.ca/cmpt372-group-project/sfu-synapse*

## Project proposal
##### Situation/Problem
Oftentimes, SFU students have a hard time getting to know classmates and building long-lasting friendships. There is a high chance that a classmate sitting right beside you is also a big fan of your favorite game. However, you would rarely come across such information in a real classroom setting and probably won’t start a conversation, missing out on the opportunity to build a relationship. Our web application will make it easier to discover other students with common interests and help users build and maintain strong connections.

## Application snapshots
| Admin page | Database manager | Sign up page |
| -----------| -----------| -----------|
| ![Snapshot 1](https://github.com/nathanlao/SFU_Synapse/assets/75557717/02653c72-3192-4d67-a775-91396517dd30) | ![Snapshot 2](https://github.com/nathanlao/SFU_Synapse/assets/75557717/2f4f6ae2-5243-40e2-b949-1c1eddaf9e61) | ![Snapshot 3](https://github.com/nathanlao/SFU_Synapse/assets/75557717/6fc9a8c7-a568-42cd-ad19-4e166211f09b) |

| Home page | Home page | Course groups page |
| -----------| -----------| -----------|
| ![Snapshot 4](https://github.com/nathanlao/SFU_Synapse/assets/75557717/1c9b107a-ced9-4161-b6bd-2f09d52e627a) | ![Snapshot 5](https://github.com/nathanlao/SFU_Synapse/assets/75557717/c9505763-f591-4945-90d5-d79d996eb529) | ![Snapshot 6](https://github.com/nathanlao/SFU_Synapse/assets/75557717/d621d70f-7512-4684-9577-347ac52b332e) |

| Communities group page | Discover subtab | Connections page |
| -----------| -----------| -----------|
| ![Snapshot 7](https://github.com/nathanlao/SFU_Synapse/assets/75557717/a279178a-97e3-4fe1-abb7-ad01a16def77) | ![Snapshot 8](https://github.com/nathanlao/SFU_Synapse/assets/75557717/f6364bb0-08cf-48df-bfa5-115405ea50b8) | ![Snapshot 9](https://github.com/nathanlao/SFU_Synapse/assets/75557717/03f7a6ab-bd13-4195-967d-399ef34c0f06) |

### Features and their Purposes
- **SFU Email Verification** 
    -  Limits app access to SFU students by verifying their SFU email when creating an account
- **Course groups**
    - Once a user enters their enrolled courses, the user will automatically become a member of these course groups and is able to access the member list and group chat of that course group.
    - **The “Discover” page** 
        - Users can easily discover other users, within the same group, with common hobbies or classes by browsing through a list of member profiles and can build connections with them.
- **Communities**
    - Users can create “communities'', or casual groups, with students that have the same interests. 
    - These communities can be private (only accessible via an invitation from a current community member) or public (accessible to any SFU student). 
    - Users can also join/leave existing communities. 
- **Connections** 
    - Helps users distinguish and filter meaningful connections by providing them the status of each of their connections, in contrast to a Facebook friend list, which is crowded with “friends” you barely know or never talk to.
        - **Pending connection** If user A sends a message to user B for the first time, this indicates the start of a conversation. At this point, this connection is considered “pending”, because a back-and-forth conversation, or mutual connection, has not happened yet. A new record will be inserted into the Connections model in the database with the status “Pending”.
        - **Active connection**. “Pending” status switches to “active” status once user B replies. 
        - **Inactive connections** “Active” connections get moved to “inactive” connections after a long period with no interaction, or exchange of messages. If the user navigates to the private chat of the inactive connection, they will see the following popup: "This connection has been idle for 4 months. Would you like to remove this connection?" Users will have the option to either keep or remove the connection, in which this connection will disappear from their connections list.
- **Admin page**
    - Administrator will have a separate link to the login page hidden from the public for secutiry
    - Administrator can browse the list of courses (data fetched from [SFU Course Outline REST API](https://www.sfu.ca/outlines/help/api.html))
    - Administrator can add/remove courses from this app



## Getting Started
Entry point: /admin/login
<br>
Start by logging in as an administrator user with pre-loaded credentials (username: default-admin, password: defAdmin@synapse). Then add courses (make sure to select the current semester SPRING2023 as users will only be displayed with courses offered during the current semester). This will add course groups to the system which will allow users to join their enrolled course groups.
<br>
<br>
Entry point: /signup
<br>
Create an account with your SFU email. Email verification code will be sent to your email. Signup with the code (which expires in 10 minutes). You can select courses and set up your basic profile in the account setup page. All settings (profile photo, bio, course selection) can be edited later on, hence you can skip if you wish.

## General Architecture and Features
### Technical Specification
Stacks: SERN - SQL + Express + React.js + Node.js
- [React.js] - HTML enhanced for web apps!
- [MySQL] - relational-database management
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [SFU Course Outline REST API] - academic course data access
- [Bootstrap] - great UI boilerplate for modern web apps

### Features
- **Login**
    - Use username and password
- **Signup**
    - Enter username (must be unique), first name, last name, password
    - Email verification
        - Checks if an SFU email is registered
        - Sends code to entered SFU email
        - Code expires in 10 minutes
    - Account setup (optional upon signup)
        - Select courses
            - Course groups for current semester added by administrator
        - Select photo
        - Enter bio
- **Admin**
    - Log in with the following credentials:
        - username: default-admin
        - password: defAdmin@synapse
    - Admin course manager
        - Data pulled from SFU Course Outlines REST API and MySQL database
        - Select semester (year, term)
            - Add course groups to system
            - Remove course groups from system
    - Database manager
        - All entries can be viewed (except for confidential data such as verification code, individual user’s passwords etc.)
    - Logout
- **Home**
    - Profile summary
    - List of connections categorized into active/inactive/pending
        - Click on “View” for user details
            - User profile
            - Course enrollment history
            - Communities the user is a member of
    - List of groups (courses and communities)
        - Click on “View” for group details
            - Group profile
            - List of members in the group
            - Icon that indicates ownership (yellow crown) and community visibility (purple shield) *only for community groups
- **Connections**
    - List of connections categorized into active/pending/inactive
        - Active
            - Connections in which back-and-forth conversations are happening within a reasonable amount of time (< 4 months between message sent and message received)
        - Pending
            - Connection status is set to ‘pending’ if there has not been a mutual conversation yet (only one user has sent a message)
        - Inactive
            - Connections in which the time gap between the most recent exchange of messages (latest message sent vs. latest message received) is longer than 4 months, OR
            - Either user has deleted their account
    - 1-on-1 Chat
    - Setting
        - Displays connection status (active/pending/inactive)
        - Disconnect
- **Groups**
    - Courses: groups of students enrolled in official SFU courses of the current term
    - Communities: casual groups of students with common interests
    - Discover
        - Display profile cards of users in the group
            - User can initiate connections with other users by clicking on a profile card and sending a message at the bottom of the page
            - This creates a “pending” connection that will appear in the list of connections in the Connections page.
    - Group chat
        - Deleted user’s messages remain with username being <anonymous>
    - Setting for both courses and communities
        - Leave (available to all users except community owners)
    - Settings limited to communities
        - Invite (only for private communities)
        - Change community status (private/public, available to owner)
        - Passing community ownership to another user in the community (available to owner)
    - Browse communities
        - Join public communities
            - List of all public communities a user is not a member of
        - Create communities
            - Enter community name, bio
            - Select group photo
            - Select visibility (public or private)
            - Community creator is the owner and the first member by default
- **Settings**
    - Edit profile
        - Select custom profile photo
        - Delete photo (resets it to default user photo)
        - Update username
            - Checks uniqueness
        - Update Bio
            - Checks length limitation
    - Change password
        - Checks for current password for security and unintended action
        - Checks for minimum requirement for security
    - Edit course enrollment
        - Allows users to browse course groups for current semester added by the administrator
        - Join (add to selected) course groups
        - Leave (remove from selected) course groups
    - Delete account
        - Checks for current password for security and unintended action
        - Checks for community ownership (users are required to transfer all ownership before deleting an account)
        - Account deletion behavior
            - Removes user from any group
            - Clears any personal information (name, email, password, etc.) while keeping messages sent in chats
    - Logout 

### Installation

Build docker image for MySQL.
```sh
docker-compose build
docker-compose up -d
```
Install the dependencies and devDependencies and start the server.
```sh
cd server
npm install
npm start
```
Install the dependencies and devDependencies and start the client.
```sh
cd client
npm install
npm start
```




[//]: #
   [MySQL]: <https://www.mysql.com/>
   [node.js]: <http://nodejs.org>
   [Bootstrap]: <https://getbootstrap.com/>
   [express]: <http://expressjs.com>
   [React.js]: <https://react.dev/>
   [SFU Course Outline REST API]: <https://www.sfu.ca/outlines/help/api.html>
