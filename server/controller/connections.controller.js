const getConnections = (req, res) => {
    res.send('Received GET request to /connections')
}

const createConnection = (req, res) => {
    res.send('Received POST request to /connections')
}



module.exports = { getConnections, createConnection }