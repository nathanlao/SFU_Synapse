const { v4: uuidv4 } = require('uuid');

const db = require('../db/connection.db').pool

const createCommunity = (req, res) => {

    const qSelect = "SELECT * FROM Groups WHERE group_name = ?";
    
    db.query(qSelect, [req.body.community_name], (err,data) => {
        
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("Community name is already used by another group. Please choose a different name.");
    })

    const qCheckUserExists = "SELECT * FROM Users WHERE username = ?"

    db.query(qCheckUserExists, [req.body.created_by], (err,data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(409).json("Requested owner is not an existing user.");
    })
    
    const group_id = uuidv4();
    const qInsertGroup = "INSERT INTO Groups (group_id, group_name, group_description) VALUE (?,?,?)";

    db.query(qInsertGroup, [group_id, req.body.community_name, req.body.bio], (err,data) => {
       
        if (err) return res.status(500).json(err);
        qInsertCommunity = "INSERT INTO Communities (community_id, created_by, visibility) VALUE (?, ?, ?)";
            
        db.query(qInsertCommunity, [group_id, req.body.created_by, req.body.visibility], (err,data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Community created successfully.");
        })
    });
}

module.exports = { createCommunity }