const getHomeContent = (req, res) => {
    res.send(`Received ${req.method} request to /`)
}

module.exports = { getHomeContent }