const db = require("../db/connection.db").pool
const { v4: uuidv4 } = require('uuid');

const getPendingConnections = (req, res) => {
    //
    const userId = "1d204095-4797-4e01-8dd5-ee7afca89f37"

    // GET data with the correct userId 
    // JOIN Connections table with Users table
    const query = `SELECT c.connection_id, c.Status, 
                        ua.username AS userA_username, 
                        ub.username AS userB_username, 
                        c.userA_id, c.userB_id
                    FROM Connections c 
                    JOIN Users ua ON c.userA_id = ua.user_id 
                    JOIN Users ub ON c.userB_id = ub.user_id
                    WHERE c.status = 'Pending'
                    AND (c.userA_id = ? OR c.userB_id = ?)`

    db.query(query, [userId, userId], (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json("Internal server error")
        } else {

            if (data || data.length > 0) {
                res.status(200).json(data)
            } else { 
                console.log("No pending connections found")
                res.status(404).json("No pending connections found")
            }
        }
    })
}

// create Pending connetion: Sender sends a msg to a receiver
const createPendingConnection = (req, res) => {

    const { senderId, receiverId } = req.body

    const insertQuery = "INSERT INTO Connections (connection_id, userA_id, userB_id, Status) VALUES (?, ?, ?, ?)"

    db.query(insertQuery, [uuidv4(), senderId, receiverId, "Pending"], (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json("Internal server error")
        } else {
            res.status(200).json("Connection created successfully")
        }
    })
}

// update Pending connection to be Active: Receiver replies to the sender
const updateConnectionStatus = (req, res) => {
    const { connection_id } = req.body

    // Check if the conection exists and the status is Pending
    const selectQuery = "SELECT * FROM Connections WHERE connection_id = ? AND Status = 'Pending'"

    db.query(selectQuery, [connection_id], (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json("Internal server error")
        } else {
            if (!data || data.length === 0) {
                res.status(404).json("Connection not found")
            } else {
                
                // Pending conection exists and update it to be Active
                const updateQuery = "UPDATE Connections SET Status = ? WHERE connection_id = ?"
                db.query(updateQuery, ["Active", connection_id], (err, data) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json("Internal server error")
                    } else {
                        res.status(200).json(data)
                    }
                })
            }
        }
    })
}

const getActiveConnections = (req, res) => {

    const query = `SELECT c.connection_id, c.Status, 
                        ua.username AS userA_username, 
                        ub.username AS userB_username
                    FROM Connections c 
                    JOIN Users ua ON c.userA_id = ua.user_id 
                    JOIN Users ub ON c.userB_id = ub.user_id
                    WHERE c.status = 'Active'`

    db.query(query, (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json("Internal server error")
        } else {

            if (data || data.length > 0) {
                res.status(200).json(data)
            } else { 
                console.log("No active connections found")
                res.status(404).json("No active connections found")
            }
        }
    })
}

const checkInactiveConnection = (req, res) => {

}

module.exports = { 
    getPendingConnections, 
    createPendingConnection, 
    updateConnectionStatus, 
    getActiveConnections, 
    checkInactiveConnection 
}