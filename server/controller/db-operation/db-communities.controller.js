const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { upload } = require('../../middleware/multer.middleware')
const db = require('../../db/connection.db').pool
const dotenv = require('dotenv')
dotenv.config()

const getCommunityVisibilityFromID = (req, res) => {
    const groupId = req.params.group_id
    const selectQuery = `SELECT visibility from Communities WHERE group_id =?`

    db.query(selectQuery, [groupId], (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json("Internal server error")
        } else {
            if (data || data.length > 0) {
                console.log(data)
                res.status(200).json(data)
            } else { 
                console.log("No community or no permission")
                res.status(404).json("No community or no permission")
            }
        }
    })
}

const checkUserIsCommunityCreator = (req, res) => {
    if (!req.session || !req.session.user) {
        return res.sendStatus(401)
    }
    const userId = req.session.user.user_id
    const groupId = req.params.group_id

    const selectQuery = `SELECT created_by from Communities WHERE community_id =? AND created_by =?`

    db.query(selectQuery, [groupId, userId], (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json("Internal server error")
        } else {
            if (data || data.length > 0) {
                res.status(200).json(data)
            } else { 
                console.log("Not community owner or no permission")
                res.status(404).json("Not community owner or no permission")
            }
        }
    })
}


function getCommunityPhoto(community_id) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT photo FROM \`Groups\` WHERE group_id=?`, [community_id], (err, data) => {
            if(err) reject(err)
            resolve(data)
        })
    })
}


// entry point (/community-photo).post()
const setCommunityPhoto = async (req, res) => {
    console.log('Received request: setCommunityPhoto')
    try {
        // delete current image if not default
        const data = await getCommunityPhoto(req.body.community_id)
        if(data[0].photo !== process.env.DEFAULT_COMMUNITY_PHOTO_PATH) {
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
            await updateCommunityPhotoInDb(req.body.community_id, filepath)
            // send response
            return res.status(200).json(filepath)
        })
    }catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}


function updateCommunityPhotoInDb(community_id, value) {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE \`Groups\` SET photo=? WHERE group_id=?`, [value, community_id], (err) => {
            if(err) reject(err)
            resolve(`Community photo has been updated to ${value}`)
        })
    })
}

const deleteCommunityPhoto = async (req, res) => {
    console.log('Received request: deleteCommunityPhoto')
    try {
        const data = await getCommunityPhoto(req.body.community_id)
        const currentpath = data[0].photo
        if(currentpath !== process.env.DEFAULT_COMMUNITY_PHOTO_PATH) {
            const imgPath = path.join(__dirname, '..', '..', 'public') + currentpath
            fs.unlink(imgPath, (err) => {
                if(err) {
                    console.log(err)
                    throw err
                }
                return
            })
            await updateCommunityPhotoInDb(req.body.community_id, process.env.DEFAULT_COMMUNITY_PHOTO_PATH)
        }
        res.status(200).json(process.env.DEFAULT_COMMUNITY_PHOTO_PATH)
    }catch(err) {
        res.status(500).json(err)
    }
}


module.exports = { getCommunityVisibilityFromID, checkUserIsCommunityCreator, setCommunityPhoto, getCommunityPhoto, deleteCommunityPhoto }