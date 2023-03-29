const { updateUser } = require('./db-operation/db-users.controller')

// updates bio
const setProfileBio = async (req, res) => {
    console.log('Received request: setProfileBio')
    const username = req.params.username
    const bio = req.body.bio

    console.log(username, bio)

    try {
        await updateUser(username, 'bio', bio)
        console.log('Setting profile bio: success')
        res.status(200).json('Setting profile bio: success')
    }catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}


module.exports = { setProfileBio }