const db = require("../db/connection.db").pool

const getConnections = (req, res) => {
    const query = "SELECT * FROM Connections"

    db.query(query, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json("Internal server error")
        } else {

            if (data || data.length > 0) {
                res.status(200).json(data)
            } else { 
                console.log("No connections found")
                res.status(404).json("No connections found")
            }
        }
    })
}

const createConnection = (req, res) => {
    res.send(`Received ${req.method} request to /connections`)
}



module.exports = { getConnections, createConnection }