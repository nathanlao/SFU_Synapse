const { v4: uuidv4 } = require('uuid');

const db = require('../db/connection.db').pool

const createUser = (req, res) => {

    const qSelect = "SELECT * FROM Users WHERE username = ?";
    
    db.query(qSelect, [req.body.username], (err,data) => {
        if (err) return res.status(500).json(err);
        
        if (data.length) return res.status(409).json("User already exists!");
        
        const qInsert = "INSERT INTO Users (user_id, username, first_name, last_name, userpass, email) VALUE (?,?,?,?,?,?)";

        const user_id = uuidv4();

        const values = [
            user_id,
            req.body.username,
            req.body.first_name,
            req.body.last_name,
            req.body.userpass,
            req.body.email,
        ];

        db.query(qInsert, values, (err,data) => {
            if (err) return res.status(500).json(err);
            req.session.user = { user_id: user_id }
            return res.status(200).json("User has been created.");
        });
    });
};

module.exports = { createUser }