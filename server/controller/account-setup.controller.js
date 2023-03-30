const { updateUser } = require('./db-operation/db-users.controller')

// updates bio
const setProfileBio = async (req, res) => {
    console.log('Received request: setProfileBio')

    if(req.session && req.session.user) {
        const username = req.session.user.username
        const bio = req.body.bio
    
        console.log(username, bio)
    
        try {
            await updateUser(username, 'bio', bio)
            res.status(200).json('Setting profile bio: success')
        }catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    }else {
        res.sendStatus(401)
    }
}


module.exports = { setProfileBio }