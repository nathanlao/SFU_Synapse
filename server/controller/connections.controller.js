const getConnections = (req, res) => {
    res.send(`Received ${req.method} request to /connections`)
}

const createConnection = (req, res) => {
    res.send(`Received ${req.method} request to /connections`)
}



module.exports = { getConnections, createConnection }