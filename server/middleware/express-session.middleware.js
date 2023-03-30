const checkLoginStatus = (req, res) => {
    console.log('checkLoginStatus')

    const userType = req.params.userType
    console.log(req.session)
    console.log(userType)
    console.log(typeof userType)

    if(userType === 'user' && req.session.user) {
        return res.sendStatus(200)
    }
    
    if(userType === 'admin' && req.session.admin) {
        return res.sendStatus(200)
    }

    return res.sendStatus(401)
}

module.exports = { checkLoginStatus }