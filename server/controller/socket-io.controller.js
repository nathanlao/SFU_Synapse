const db = require("../db/connection.db").pool

const socketController = (io) => {

    // Socketio Server listens for "connection" event
    io.on("connection", (socket) => {
        console.log("User connected: ", socket.id)
        socket.on('sendMessage', ( { sender_id, receiver_id, message, timestamp} ) => {
            const newMessage = {
                sender_id,
                receiver_id,
                message,
                timestamp
            }

            // Save the message to the database
            const insertQuery = 'INSERT INTO DirectMessages SET ?';
            db.query(insertQuery, newMessage, (err) => {
                if (err) throw err;
                console.log('Message saved to the database');
            });

            // Emit the message to the receiver
            socket.broadcast.to(receiver_id).emit('receiveMessage', newMessage);
        })

        socket.on("disconnect", () => {
            console.log("User Disconnect", socket.id)
        })
    })
}

module.exports = socketController