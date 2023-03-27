const { updateUser } = require('./db-operation/db-users.controller')

// updates bio
const setProfileBio = async (req, res) => {
    console.log('Received request: setProfileBio')
    const username = req.params.username
    const bio = req.body.bio

    console.log(username, bio)

    try {
        await updateUser(username, 'bio', bio)
        res.status(200).json('Setting profile bio: success')
    }catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// updates user's profile photo
const setProfilePhoto = async (req, res) => {
    console.log('Received request: setProfilePhoto')
    const username = req.params.username
    const photo = req.body.photo
    
    try {
        await updateUser(username, 'photo', photo)
        res.status(200).json('Setting profile photo: success')

    }catch(err) {
        res.status(500).json(err)
    }
}

// update enrolled courses

module.exports = { setProfileBio, setProfilePhoto }