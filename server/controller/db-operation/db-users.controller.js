const db = require('../../db/connection.db').pool


function updateUser(username, field, value) {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE Users SET ${field}=? WHERE username=?`, [value, username], (err) => {
            if(err) reject(err)
        })
    })
}

module.exports = { updateUser }