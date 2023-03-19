const db = require('../db/connection.db').pool


const verifyLogin = (req, res) => {

    let username = req.body.username
    let userpass = req.body.userpass

    const query = 'SELECT * FROM Users WHERE username=?'

    db.query(query, [username], (err, data) => {
        if(err) {
            res.status(500).json(err)
        }else {
            if(data.length > 0 && data[0].userpass === userpass) {
                res.status(200).json("Login success")
            }else {
                res.status(401).json("Incorrect username or password")
            }
        }
    })

}

module.exports = { verifyLogin }