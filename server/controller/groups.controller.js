const getGroups = (req, res) => {
    res.send(`Received ${req.method} request to /groups`)
}
const createGroup = (req, res) => {
    res.send(`Received ${req.method} request to /groups`)
}

module.exports = { getGroups, createGroup }