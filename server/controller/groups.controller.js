const db = require('../db/connection.db').pool

const getCourseGroups = (req, res) => {

    if (!req.session || !req.session.user) {
        return res.sendStatus(401)
    }
    const userId = req.session.user.user_id

    const selectQuery = `SELECT M.group_id, G.group_name, G.photo, 
                            COUNT(distinct M.user_id) AS num_members
                        FROM MemberOf M, \`Groups\` G, Courses C 
                        WHERE M.group_id = G.group_id 
                        AND G.group_id = C.course_id
                        AND M.user_id = ?
                        GROUP BY M.group_id, G.group_name, G.photo`

    db.query(selectQuery, [userId], (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json("Internal server error")
        } else {
            if (data || data.length > 0) {
                res.status(200).json(data)
            } else {
                console.log("No course groups found")
                res.status(404).json("No course groups found")
            }
        }
    })    
}
const createGroup = (req, res) => {
    res.send(`Received ${req.method} request to /groups`)
}

module.exports = { getCourseGroups, createGroup }