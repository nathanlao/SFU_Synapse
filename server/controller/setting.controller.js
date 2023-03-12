const getSettings = (req, res) => {
    res.send('Received GET request to /setting')
}
const updateSettings = (req, res) => {
    res.send('Received PUT request to /setting')
}

module.exports = { getSettings, updateSettings }