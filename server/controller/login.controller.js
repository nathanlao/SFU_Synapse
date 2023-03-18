const { Response, ResCode, LoginStatus } = require('../Response')
const db = require('../db/connection.db').pool

const verifyLogin = (req, res) => {
    // get username and password from form data
    let username = '<get_from_req_object>'
    let password = '<get_from_req_object>'

    const sql = 'SELECT * FROM Users WHERE username=?'
    db.query(sql, [username], (err, data) => {
        if(err) {
            res.json(JSON.stringify(new Response(LoginStatus.INTERNALERR), 'Database retrieval failed.'))
        }else {
            if(data.length > 0) {
                // check if password is valid
                console.log(`We found an account with username: ${username}!`)
                console.log(data)

                // IMPLEMENT HERE!
                // if(password in record returned matches passoword sent through the post request body)
                    // console/log('Password correct! You may log in!')
                        res.json(JSON.stringify(new Response(LoginStatus.SUCCESS, null)))
                // else {
                    // console.log('Incorrect password')
                    // res.json(JSON.stringify(new Response(LoginStatus.INVALIDPASS, null)))
                // }
            }else {
                console.log(`Account with username ${username} does not exist. Please double-check username.`)
                // res.json(JSON.stringify(new Response(LoginStatus.NOACCOUNT, null)))
            }
        }
    })

}

module.exports = { verifyLogin }