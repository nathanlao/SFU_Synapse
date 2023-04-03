const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { upload } = require('../../middleware/multer.middleware')
const db = require('../../db/connection.db').pool
const dotenv = require('dotenv')
dotenv.config()


// entry point (/community-photo).post()
const setCommunityPhoto = async (req, res) => {
    console.log('Received request: setCommunityPhoto')

    if(!req.session || !req.session.user) {
        return res.sendStatus(401)
    }


    const user_id = req.session.user.user_id

    try {
        // delete current image if not default
        const data = await getUserField(user_id, 'photo')
        if(data[0].photo !== process.env.DEFAULT_USER_PHOTO_PATH) {
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
            await updateUser(user_id, 'photo', filepath)

            // send response
            return res.status(200).json(filepath)
        })
    }catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

const getCommunityPhoto = async (req, res) => {
    if(!req.session || !req.session.user) {
        return res.sendStatus(401)
    }

    try {
        const data = await getUserField(req.session.user.user_id, 'photo')
        res.status(200).json(data[0].photo)
    }catch(err) {
        res.status(500).json(err)
    }
}

const deleteCommunityPhoto = async (req, res) => {
    console.log('Received request: deleteCommunityPhoto')

    if(!req.session || !req.session.user) {
        return res.sendStatus(401)
    }

    const user_id = req.session.user.user_id

    try {
        const data = await getUserField(user_id, 'photo')
        const currentpath = data[0].photo


        if(currentpath !== process.env.DEFAULT_USER_PHOTO_PATH) {
            const imgPath = path.join(__dirname, '..', '..', 'public') + currentpath
            fs.unlink(imgPath, (err) => {
                if(err) {
                    console.log(err)
                    throw err
                }
                return
            })

            await updateUser(user_id, 'photo', process.env.DEFAULT_USER_PHOTO_PATH)
        }

        res.status(200).json(process.env.DEFAULT_USER_PHOTO_PATH)

    }catch(err) {
        res.status(500).json(err)
    }
}


module.exports = { setCommunityPhoto, getCommunityPhoto, deleteCommunityPhoto }