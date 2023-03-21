const db = require('../db/connection.db').pool


const getSettings = (req, res) => {

    const qSelect = "SELECT * FROM Users WHERE user_id = ?";
    
    db.query(qSelect, [req.body.user_id], (err,data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).send(data);
    });
}

const updateSettings = (req, res) => {

    const values = [
        req.body.username,
        req.body.first_name,
        req.body.last_name,
        req.body.userpass,
        req.body.email,
        req.body.photo,
        req.body.bio,
        req.body.user_id,
    ];

    const qUpdate = "UPDATE Users SET username=?, first_name=?, last_name=?, userpass=?, email=?, photo=?, bio=? WHERE user_id = ?"

    db.query(qUpdate, [values], (err,data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User settings have been updated.");
    });
}

const deleteUser = (req, res) => {

    const qDelete = "DELETE FROM Users WHERE user_id = ?";
    
    db.query(qDelete, [req.body.user_id], (err,data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Deleted user.");
    });
}


module.exports = { getSettings, updateSettings, deleteUser }