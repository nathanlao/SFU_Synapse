# CMPT372 Group 19
### _Social Networking Web Application for SFU students_
Members
- Risa.K, 
- Nathan.L
- Jason.N
- Rachel.S

Link to application: https://csil-git1.cs.surrey.sfu.ca/cmpt372-group-project/sfu-synapse
<br>
GitLab url: *https://csil-git1.cs.surrey.sfu.ca/cmpt372-group-project/sfu-synapse*


## Checkpoint
### Progress
Entry points are https://20230322t232139-dot-sfu-synapse.uc.r.appspot.com/login, https://20230322t232139-dot-sfu-synapse.uc.r.appspot.com/signup, and https://20230322t232139-dot-sfu-synapse.uc.r.appspot.com/admin/login.
<br>
What you can play around with at the moment:
- **Signup page**
    - Enter credentials (username, password, email, etc.) and click "sign up".
    - Email verification to be implemented
- **Login page**
    - Enter username & password of an existing account
    - Navigates to main page when login is successful
- **Connections tab**
    - Can toggle through connections, categorized into different connection statuses (Active, Pending, Inactive)
    - User is able to switch the status of a connection from ‘Pending’ to ‘Active’
    - Front end is still under development
- **Groups tab**
    - Can toggle course groups and community groups
    - Can view Discover and Chat subtabs of a group, using the following endpoints (will be linked properly later):
        - Discover: https://20230322t232139-dot-sfu-synapse.uc.r.appspot.com/groups/discover
        - Chat: https://20230322t232139-dot-sfu-synapse.uc.r.appspot.com/groups/chat
    - Front end is still under development
- **Settings page**
    - implemented: front end UI, backend logic 
    - to be implemented: front end logic
- **Admin login page**
    - Use the following credentials:
        - username: default-admin
        - password: defAdmin@synapse
- **Admin page**
    - This page is fully functional, with a few bugs that we will resolve later (asynchronous processes causing buttons to not display as expected)
    - We plan to add a view that only displays the courses in the database
        - Modify the current term or year, click on departments or courses
        - View course listings of each department




### Technical Specification (subject to change)
Stacks: SERN - SQL + Express + React.js + Node.js
- [React.js] - HTML enhanced for web apps!
- [MySQL] - awesome web-based text editor
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [SFU Course Outline REST API] - fast node.js network app framework
- [Bootstrap] - great UI boilerplate for modern web apps
### Installation
**development version on GitLab*

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


## Project proposal
##### Situation/Problem
Oftentimes, SFU students have a hard time getting to know classmates and building long-lasting friendships. There is a high chance that a classmate sitting right beside you is also a big fan of your favorite game. However, you would rarely come across such information in a real classroom setting and probably won’t start a conversation, missing out on the opportunity to build a relationship. Our web application will make it easier to discover other students with common interests and help users build and maintain strong connections.


### Features
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








[//]: #
   [MySQL]: <https://www.mysql.com/>
   [node.js]: <http://nodejs.org>
   [Bootstrap]: <https://getbootstrap.com/>
   [express]: <http://expressjs.com>
   [React.js]: <https://react.dev/>
   [SFU Course Outline REST API]: <https://www.sfu.ca/outlines/help/api.html>