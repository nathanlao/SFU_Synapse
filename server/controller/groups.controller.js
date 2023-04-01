const db = require('../db/connection.db').pool

const getCourseGroups = (req, res) => {

    if (!req.session || !req.session.user) {
        return res.sendStatus(401)
    }
    const userId = req.session.user.user_id

    const selectQuery = `SELECT M.group_id, G.group_name, G.photo
                        FROM MemberOf M, \`Groups\` G, Courses C 
                        WHERE M.group_id = G.group_id 
                        AND G.group_id = C.course_id
                        AND M.user_id = ?`

    // Separate query to get number of members
    const countMembersQuery = `SELECT M.group_id, COUNT(DISTINCT M.user_id) AS num_members
                            FROM MemberOf M, \`Groups\` G, Courses C
                            WHERE M.group_id = G.group_id
                            AND G.group_id = C.course_id
                            GROUP BY M.group_id`

    db.query(selectQuery, [userId], (err, groupData) => {
        if (err) {
            console.log(err);
            res.status(500).json("Internal server error");
        } else {
            db.query(countMembersQuery, (err, memberCountData) => {
                if (err) {
                    console.log(err);
                    res.status(500).json("Internal server error");
                } else {
                    // combined groups and number of memebers data 
                    const combinedData = groupData.map(group => {
                        const memberCount = memberCountData.find(m => m.group_id === group.group_id)
                        return {
                            ...group,
                            num_members: memberCount ? memberCount.num_members : 0,
                        }
                    })

                    if (combinedData && combinedData.length > 0) {
                        res.status(200).json(combinedData);
                    } else {
                        console.log("No course groups found")
                        res.status(404).json("No course groups found")
                    }
                }
            })
        }
    })
}

const createGroup = (req, res) => {
    res.send(`Received ${req.method} request to /groups`)
}

module.exports = { getCourseGroups, createGroup }