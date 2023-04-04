const db = require('../db/connection.db').pool

// ENTRY POINT: '/api/:year/:term'
const getHomeContent = async (req, res) => {
    if(!req.session || !req.session.user) {
        return res.sendStatus(401)
    }

    const user_id = req.session.user.user_id
    const year = req.params.year
    const term = req.params.term
    

    try {
        const user = await getUser(user_id)
        const connections = await getConnections(user_id)
        const courses = await getCourses(user_id, year, term)
        const communities = await getCommunities(user_id)
        
        const resObj = {
            user: user,
            connections: connections,
            courses: courses,
            communities: communities
        }

        console.log(resObj)
        res.status(200).json(resObj)
    }catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

// helper functions
async function getUser(user_id) {
    return new Promise((resolve, reject) => {
        const status = 1
        console.log(user_id, status)
        const query = 'SELECT user_id, username, first_name, last_name, photo, bio FROM Users WHERE user_id=? AND status=?'
        db.query(query, [user_id, status], (err, data) => {
            if(err) return reject(err)
            return resolve(data[0])
        })
    })
}

async function getConnections(user_id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT username, first_name, last_name, photo FROM Users WHERE user_id IN (SELECT C1.userB_id AS user_id FROM Connections C1 WHERE C1.userA_id=? UNION SELECT C2.userA_id FROM Connections C2 WHERE C2.userB_id=?)'
        db.query(query, [user_id, user_id], (err, data) => {
            if(err) return reject(err)
            return resolve(data)

        })
    })
}

async function getCourses(user_id, year, term) {
    return new Promise((resolve, reject) => {
        console.log(user_id, year, term)
        const query = 'SELECT C.course_id, G.group_name, G.group_description, G.photo FROM MemberOf M, Courses C, `Groups` G WHERE M.group_id=C.course_id AND C.course_id=G.group_id AND M.user_id=? AND C.offered_year=? AND C.offered_term=?'
        db.query(query, [user_id, year, term], (err, data) => {
            if(err) return reject(err)
            console.log(data)
            return resolve(data)
        })
    })
}
async function getCommunities(user_id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT C.community_id, G.group_name, G.group_description, G.photo, C.created_by, C.visibility FROM MemberOf M, Communities C, `Groups` G WHERE M.group_id=C.community_id AND C.community_id=G.group_id AND M.user_id=?'
        db.query(query, [user_id], (err, data) => {
            if(err) return reject(err)
            return resolve(data)
        })
    })
}

const getApp = (req, res) => {
    console.log('Received request: getApp')
    res.status(200).json('Retrieving data for SFU Synapse.')
}

module.exports = { getHomeContent, getApp }