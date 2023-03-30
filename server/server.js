const express = require('express')
// const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')
const Routes = express.Router()
const dotenv = require('dotenv')
// For building server with socketio
const http = require('http')
const { Server } = require('socket.io')
const db = require("./db/connection.db").pool

// const session = require('express-session')
dotenv.config()


// controllers
const { getHomeContent } = require('./controller/home.controller')
const { getPendingConnections, createPendingConnection, updateConnectionStatus, getActiveConnections ,getMessagesForConnection} = require('./controller/connections.controller')
const { getGroups, createGroup } = require('./controller/groups.controller')
const { verifyLogin, verifyAdminLogin } = require('./controller/login.controller')
const { addSection, addCourse, deleteCourse, deleteSection } = require('./controller/admin.controller')
const { getSettings, updateSettings, deleteUser } = require('./controller/setting.controller')
const { createUser } = require('./controller/signup.controller')
const { fetchCourseInfo } = require('./controller/course-list.controller')
const { getDepartments, getCourses, getSections, getEnrolledCourses, addUserToCourse, removeUserFromCourse } = require('./controller/db-operation/db-courses.controller');
const { getTableData } = require('./controller/dev.controller');
const { setProfileBio } = require('./controller/account-setup.controller');
const { setUserPhoto, getUserPhoto, deleteUserPhoto } = require('./controller/db-operation/db-users.controller');
const { checkLoginStatus } = require('./middleware/express-session.middleware');
const session = require('express-session');

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/images', express.static('public/images')) // for serving profile images stored in server
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://sfu-synapse.uc.r.appspot.com/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}))

// Socketio Server listens for "connection" event
io.on("connection", (socket) => {
    console.log("User connected: ", socket.id)

    // Direct Message
    socket.on('join-private-room', (connectionId) => {
        socket.join(connectionId);
        console.log(`${socket.id} Joined room: ${connectionId}`);
    });

    socket.on('leave-private-room', (connectionId) => {
        socket.leave(connectionId);
        console.log(`${socket.id} Left room: ${connectionId}`);
    });

    socket.on('send-private-message', (messageData) => {
        console.log("Data from front end: ", messageData)
        console.log("Sending to connectionId room: ", messageData.connectionId)
        io.to(messageData.connectionId).emit("receive-private-message", messageData)
        // socket.broadcast.emit("receive-private-message", messageData)
    })

    socket.on("disconnect", () => {
        console.log("User Disconnect", socket.id)
    })
})

app.use(session({
    name: 'synapse-login',
    secret: process.env.SESSION_SECRET_STRING,
    resave: false,
    maxAge: 24 * 60 * 60 * 1000,
    saveUninitialized: false
}))

// log to console [DEV]
app.use('/', function(req,res,next){
    console.log(req.method, 'request: ', req.url, JSON.stringify(req.body))
    next()
})





// Route: main
Routes.route('/')
    .get(getHomeContent)
Routes.route('/connections')
    .get(getPendingConnections)
    .post(createPendingConnection)
Routes.route('/connections/:connetionId')
    .get(getActiveConnections)
    .put(updateConnectionStatus) 
Routes.route('/groups')
    .get(getGroups)
    .post(createGroup)
Routes.route('/setting')
    .get(getSettings)
    .put(updateSettings)
    .delete(deleteUser)


// Route: signup
Routes.route('/signup')
.post(createUser)
// Route: account setup
Routes.route('/course-list/:year/:term')
.get(getDepartments)
Routes.route('/course-list/:year/:term/:dep')
    .get(getCourses)
Routes.route('/course-list/:year/:term/:dep/:course')
    .get(getSections)
Routes.route('/setup/bio')
    .put(setProfileBio) // should rename to setUserBio to differentiate it from setGroupBio 
// photo file CRUD
Routes.route('/user-photo')
    .post(setUserPhoto)
    .get(getUserPhoto)
    .delete(deleteUserPhoto)

// Route: login
Routes.route('/login')
    .post(verifyLogin)
Routes.route('/checkLoginStatus/:userType')
    .get(checkLoginStatus)


// Route: admin
Routes.route('/admin/login')
    .post(verifyAdminLogin)
Routes.route('/admin')
    .post(fetchCourseInfo)
Routes.route('/admin/add-section')
    .post(addSection)
Routes.route('/admin/add-course')
    .post(addCourse)
Routes.route('/admin/delete-section')
    .post(deleteSection)
Routes.route('/admin/delete-course')
    .post(deleteCourse)


// User specific data
Routes.route('/course/:year/:term')
    .get(getEnrolledCourses)
Routes.route('/:year/:term/:dep/:num/:section')
    .delete(removeUserFromCourse)
    .post(addUserToCourse)

// Development purpose
Routes.route('/dev/db/:table')
    .get(getTableData)

app.use('/api', Routes)
app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})
app.use(express.json());

server.listen(8080, () => console.log(`Server listening on port 8080`))