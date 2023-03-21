const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const Routes = express.Router()
const dotenv = require('dotenv')
const cors = require('cors')
// const session = require('express-session')


// controllers
const { getHomeContent } = require('./controller/home.controller')
const { getPendingConnections, createPendingConnection, updateConnectionStatus, getActiveConnections} = require('./controller/connections.controller')
const { getGroups, createGroup } = require('./controller/groups.controller')
const { verifyLogin, verifyAdminLogin } = require('./controller/login.controller')
const { fetchCourseInfo, addSection, addCourse, deleteCourse, deleteSection } = require('./controller/admin.controller')
const { getSettings, updateSettings, deleteUser } = require('./controller/setting.controller')
const { createUser } = require('./controller/signup.controller')


dotenv.config()
app.use(bodyParser.json())
app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}))
// app.use(
//     session({
//         name: 'session_name',
//         secret: 'choose_secure_secret',
//         resave: false,
//         maxAge: 1000 * 60 * 60 * 24,
//         saveUninitialized: true
//     })
// )

Routes.route('/')
    .get(getHomeContent)
Routes.route('/signup')
    .post(createUser)
Routes.route('/connections')
    .get(getPendingConnections)
    .post(createPendingConnection)
Routes.route('/connections/:id')
    .get(getActiveConnections)
    .put(updateConnectionStatus)    
Routes.route('/groups')
    .get(getGroups)
    .post(createGroup)
Routes.route('/setting')
    .get(getSettings)
    .put(updateSettings)
    .delete(deleteUser)
Routes.route('/login')
    .post(verifyLogin)
Routes.route('/signup')
    .post(createUser)
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

app.use('/', Routes)
app.all('*', (req, res) => {
    res.send('404 Not Found. Please check url')
})
app.use(express.json());

app.listen(process.env.SERVER_PORT, () => console.log(`Server listening on port ${process.env.SERVER_PORT}`))