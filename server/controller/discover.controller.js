const db = require("../../db/connection.db").pool

const getUnconnectedGroupMembers = (req, res) => {

    if (!req.session || !req.session.user) {
        return res.status(401).json("Login is required.")
    }
    const user_id = req.session.user.user_id
    const group_id = req.params.group_id

    // get all info of users who are a member of the current group 
    // but do not have a connection with the current user
    const query = `SELECT * 
                    FROM Users 
                    WHERE user_id IN
                        (SELECT user_id 
                        FROM MemberOf 
                        WHERE group_id = ? AND user_id NOT IN 
                            (SELECT userA_id AS user_id
                            FROM Connections
                            WHERE userB_id = ?
                            UNION 
                            SELECT userB_id AS user_id
                            FROM Connections
                            WHERE userA_id = ?)
                        )`

    db.query(query, [group_id, user_id, user_id], (err, result) => {
        if (err) return res.status(500).json(err)
        if (data.length === 0) return res.status(404).json("No users to connect with.")
        return res.status(200).json(result.rows)
    })
}

module.exports = { getUnconnectedGroupMembers }