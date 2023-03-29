const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { upload } = require('../../middleware/multer.middleware')
const db = require('../../db/connection.db').pool
const DEFAULT_USER_PHOTO_PATH = '/images/default/default-user-photo.png'


// updates a field in user table with username
function updateUser(username, field, value) {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE Users SET ${field}=? WHERE username=?`, [value, username], (err) => {
            if(err) reject(err)
            resolve(`Field name '${field}' in Users table has been updated to ${value}`)
        })
    })
}

// gets value of a field in user table with username
function getUserField(username, field) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT ${field} FROM Users WHERE username=?`, [username], (err, data) => {
            if(err) reject(err)
            resolve(data)
        })
    })
}


// entry point (/user-photo/:username).post()
const setUserPhoto = async (req, res) => {
    console.log('Received request: setUserPhoto')
    const username = req.params.username

    try {
        // delete current image if not default
        const data = await getUserField(username, 'photo')
        if(data[0].photo !== DEFAULT_USER_PHOTO_PATH) {
            // delete current photo
            const currentpath = data[0].photo
            const imgPath = path.join(__dirname, '..', '..', 'public') + currentpath
            fs.unlink(imgPath, (err) => {
                if(err) {
                    console.log(err)
                    throw err
                }
                return
            })
        }

        upload(req, res, async (err) => {
            if(err instanceof multer.MulterError) {
                return res.status(500).json(err)
            }else if(err) {
                return res.status(500).json(err)
            }
            
            // save filename in database
            const filepath = '/images/uploads/' + req.file.filename
            await updateUser(req.params.username, 'photo', filepath)

            // send response
            return res.status(200).json(filepath)
        })
    }catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const getUserPhoto = async (req, res) => {
    if(!req.params.username) {
        res.status(400).json('Missing parameter username.')
    }

    try {
        const data = await getUserField(req.params.username, 'photo')
        // console.log(data[0].photo)
        res.status(200).json(data[0].photo)
    }catch(err) {
        res.status(500).json(err)
    }
}

const deleteUserPhoto = async (req, res) => {
    console.log('Received request: deleteUserPhoto')
    const username = req.params.username

    try {
        const data = await getUserField(username, 'photo')
        const currentpath = data[0].photo


        if(currentpath !== DEFAULT_USER_PHOTO_PATH) {
            const imgPath = path.join(__dirname, '..', '..', 'public') + currentpath
            fs.unlink(imgPath, (err) => {
                if(err) {
                    console.log(err)
                    throw err
                }
                return
            })

            await updateUser(username, 'photo', DEFAULT_USER_PHOTO_PATH)
        }

        res.status(200).json(DEFAULT_USER_PHOTO_PATH)

    }catch(err) {
        res.status(500).json(err)
    }
}

module.exports = { updateUser, setUserPhoto, getUserPhoto, deleteUserPhoto }