const { v4: uuidv4 } = require('uuid');

const db = require('../db/connection.db').pool

const getCommunityVisibilityFromID = (req, res) => {
    if (!req.session || !req.session.user) {
        return res.sendStatus(401)
    }
    const userId = req.session.user.user_id
    const groupId = req.params.group_id

    const selectQuery = `SELECT visibility from Communities WHERE group_id =?`

    db.query(selectQuery, [groupId], (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json("Internal server error")
        } else {
            if (data || data.length > 0) {
                console.log(data)
                res.status(200).json(data)
            } else { 
                console.log("No community or no permission")
                res.status(404).json("No community or no permission")
            }
        }
    })
}

const checkUserIsCommunityCreator = (req, res) => {
    if (!req.session || !req.session.user) {
        return res.sendStatus(401)
    }
    const userId = req.session.user.user_id
    const groupId = req.params.group_id

    const selectQuery = `SELECT created_by from Communities WHERE community_id =? AND created_by =?`

    db.query(selectQuery, [groupId, userId], (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json("Internal server error")
        } else {
            if (data || data.length > 0) {
                res.status(200).json(data)
            } else { 
                console.log("Not community owner or no permission")
                res.status(404).json("Not community owner or no permission")
            }
        }
    })
}

const createCommunity = (req, res) => {

    const user_id = ""
    const username = ""
    
    //get username of the community creator
    if (!req.session || !req.session.user) {
        return res.status(401).json("Login is required.")
    }
    user_id = req.session.user.user_id

    const qGetUsername = "SELECT * FROM Users WHERE user_id = ?"
    db.query(qGetUsername, [user_id], (err,result) => {
        if (err) return res.status(500).json(err);
        username = result[0].username
    })

    //check uniqueness of the name of the community being created
    const qSelect = "SELECT * FROM `Groups` WHERE group_name = ?";
    db.query(qSelect, [req.body.community_name], (err,data) => {    
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("Community name is already used by another group. Please choose a different name.");
    })
    
    //add a group entry to db
    const group_id = uuidv4();
    const qInsertGroup = "INSERT INTO `Groups` (group_id, group_name, group_description, photo) VALUE (?,?,?,?)";

    db.query(qInsertGroup, [group_id, req.body.community_name, req.body.bio, req.body.photo], (err,data) => {
        if (err) return res.status(500).json(err);
        const qInsertCommunity = "INSERT INTO Communities (community_id, created_by, visibility) VALUE (?, ?, ?)";
        
        //add a community entry, referencing the group entry above, to db
        db.query(qInsertCommunity, [group_id, username, req.body.visibility], (err,data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Community created successfully.");
        })
    });
}

module.exports = { getCommunityVisibilityFromID, checkUserIsCommunityCreator, createCommunity }