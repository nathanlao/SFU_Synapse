const getGroups = (req, res) => {
    res.send('Received GET request to /groups')
}
const createGroup = (req, res) => {
    res.send('Received POST request to /groups')
}

module.exports = { getGroups, createGroup }