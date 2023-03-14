const getSettings = (req, res) => {
    res.send(`Received ${req.method} request to /setting`)
}
const updateSettings = (req, res) => {
    res.send(`Received ${req.method} request to /setting`)
}

module.exports = { getSettings, updateSettings }