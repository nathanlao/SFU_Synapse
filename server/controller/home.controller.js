const getHomeContent = (req, res) => {
    res.send('Received GET request to /')
}

module.exports = { getHomeContent }