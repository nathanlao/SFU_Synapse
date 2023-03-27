const db = require('../db/connection.db').pool


const getTableData = (req, res) => {
    console.log('Getting all data from ' + req.params.table + "'s table.")
    db.query(`SELECT * FROM ${req.params.table}`, (err, data) => {
        if(err) {
            res.status(500).json(err)
        }
        res.status(200).json(data)
    })
}

module.exports = { getTableData }