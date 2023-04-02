const { v4: uuidv4 } = require('uuid');

const db = require('../db/connection.db').pool

const createUser = async (req, res) => {

    try {
        // 1. verify email
        const promise1 = new Promise((resolve, reject) => {
            let time = new Date()
            const datetime = time.toISOString().slice(0, 19).replace('T', ' ')
    
            console.log(datetime)
            const query = 'SELECT COUNT(*) AS count FROM AuthCodes WHERE email=? AND code=? AND expires > Now()'
            // const query = 'SELECT COUNT(A1.code) AS count FROM AuthCodes A1 WHERE A1.email=? AND A1.code IN (SELECT A2.code FROM AuthCodes A2 WHERE A2.email=? AND A2.expires > NOW())'
            db.query(query, [req.body.email, req.body.code], (err, data) => {
                if(err) return reject(err)
                console.log(data[0].count)
                if(data[0].count > 0) {
                    return resolve(true) // verified
                }else {
                    return resolve(false)
                }
            })
        })

        const verified = await promise1
        if(!verified) {
            return res.status(400).json('We could not verify your email. Please resend the verification code and try again.')
        }


        // 2. check username uniqueness
        const promise2 = new Promise((resolve, reject) => {
            const qSelect = "SELECT * FROM Users WHERE username = ?";
            db.query(qSelect, [req.body.username], (err, data) => {
                if(err) return reject(err)
                if(data.length) {
                    return resolve(false) // username not unique
                }else {
                    return resolve(true)
                }
            })
        })

        const unique = await promise2
        if(!unique) {
            return res.status(400).json("This username is already being used. Please choose another one.")
        }

        // 3. create new user (email verified, username unique)
        const promise3 = new Promise((resolve, reject) => {
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

            db.query(qInsert, values, (err) => {
                if (err) return reject(err)
                return resolve(user_id)
            })
        })

        const new_user_id = await promise3
        req.session.user = { user_id: new_user_id }


        // 4. remove registered email from AuthCodes table
        const promise4 = new Promise((resolve, reject) => {
            const query = 'DELETE FROM AuthCodes WHERE email=?'

            db.query(query, [req.body.email], (err) => {
                if(err) return reject(err)
                return resolve()
            })
        })

        await promise4


        console.log('all done.')
        return res.status(200).json('User has been created.')

    }catch(err) {
        res.status(500).json(err)
    }



    // // 2. create user
    // const qSelect = "SELECT * FROM Users WHERE username = ?";
    
    // db.query(qSelect, [req.body.username], (err,data) => {
    //     if (err) return res.status(500).json(err);
        
    //     if (data.length) return res.status(409).json("User already exists!");
        
    //     const qInsert = "INSERT INTO Users (user_id, username, first_name, last_name, userpass, email) VALUE (?,?,?,?,?,?)";

    //     const user_id = uuidv4();

    //     const values = [
    //         user_id,
    //         req.body.username,
    //         req.body.first_name,
    //         req.body.last_name,
    //         req.body.userpass,
    //         req.body.email,
    //     ];

    //     db.query(qInsert, values, (err,data) => {
    //         if (err) return res.status(500).json(err);
    //         req.session.user = { user_id: user_id }
    //         return res.status(200).json("User has been created.");
    //     });
    // });
};

module.exports = { createUser }