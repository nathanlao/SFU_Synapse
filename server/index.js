const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const Routes = express.Router()
const dotenv = require('dotenv')
const cors = require('cors')
// const session = require('express-session')


// controllers
const { getHomeContent } = require('./controller/home.controller')
const { getConnections, createConnection } = require('./controller/connections.controller')
const { getGroups, createGroup } = require('./controller/groups.controller')
const { getSettings, updateSettings } = require('./controller/setting.controller')
const { verifyLogin, verifyAdminLogin } = require('./controller/login.controller')
const { getCourseCatalog, fetchCourseInfo, addSection, addCourse, deleteCourse, deleteSection } = require('./controller/admin.controller')

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
Routes.route('/connections')
    .get(getConnections)
    .post(createConnection)
Routes.route('/groups')
    .get(getGroups)
    .post(createGroup)
Routes.route('/setting')
    .get(getSettings)
    .put(updateSettings)
Routes.route('/login')
    .post(verifyLogin)
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

app.listen(process.env.SERVER_PORT, () => console.log(`Server listening on port ${process.env.SERVER_PORT}`))