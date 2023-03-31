const db = require('../db/connection.db').pool
const { getUserField } = require('../controller/db-operation/db-users.controller')


const getSettings = (req, res) => {
    
    if(!req.session || !req.session.user) {
        return res.sendStatus(401)
    }

    const qSelect = "SELECT username, bio, photo FROM Users WHERE user_id = ?";
    
    db.query(qSelect, [req.session.user.user_id], (err,data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).send(data);
    });
}

const updateSettings = (req, res) => {

    if(!req.session || !req.session.user) {
        return res.sendStatus(401)
    }

    const values = [
        req.body.username,
        req.body.bio,
        req.session.user.user_id,
    ];

    console.log(req.body.username, req.body.bio, req.session.user.user_id)

    const qUpdate = "UPDATE Users SET username=?, bio=? WHERE user_id = ?"

    db.query(qUpdate, values, (err) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User settings have been updated.");
    });
}

const updatePassoword = async (req, res) => {
    console.log('Received request: updatePassoword')
    if(!req.session || !req.session.user) {
        return res.sendStatus(401)
    }

    // compare with current password
    const data = await getUserField(req.session.user.user_id, 'userpass')
    if(data[0].userpass !== req.body.oldPassword) {
        return res.status(400).json('Incorrect password.')
    }

    // update password
    const qUpdate = "UPDATE Users SET userpass=? WHERE user_id = ?"
    db.query(qUpdate, [req.body.newPassword, req.session.user.user_id], (err) => {
        if(err) {
            return res.status(500).json(err)
        }
        return res.status(200).json("User password has been updated.")
    })
}

const deleteUser = (req, res) => {

    const qDelete = "DELETE FROM Users WHERE user_id = ?";
    
    db.query(qDelete, [req.body.user_id], (err,data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Deleted user.");
    });
}


module.exports = { getSettings, updateSettings, updatePassoword, deleteUser }