const { v4: uuidv4 } = require('uuid');

const db = require('../db/connection.db').pool


const createUser = (req, res) => {
    const query = "INSERT INTO Users (user_id, username, first_name, last_name, email, userpass) VALUES ( ?, ?, ?, ?, ?, ?)";

    db.query(query, [uuidv4(), req.body.username, req.body.first_name, req.body.last_name, req.body.email, req.body.userpass], (err, data) => {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(200).json("Successfully created account");
        }
    })
}

module.exports = { createUser }