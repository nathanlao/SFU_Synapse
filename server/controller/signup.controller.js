import {db} from "../db/connection.db.js";

export const signup = (req, res) => {
    const qSelect = "SELECT * FROM users WHERE username = ?";
    db.query(qSelect, [req.body.username], (err,data) => {
        if (err) return res.status(500).json(err);
        
        if (data.length) return res.status(409).json("User already exists!");
        
        if (req.body.userpass !== req.body.confirm_pass) return res.status(400).json("Password confirmation failed.");

        const qInsert = "INSERT INTO Users ('user_id', 'username', 'first_name', 'last_name', 'userpass', 'email') VALUE (?)";

        const user_id = req.body.email.substring(0, req.body.email.indexOf('@'))

        const values = [
            user_id,
            req.body.username,
            req.body.first_name,
            req.body.last_name,
            req.body.userpass,
            req.body.email,
        ];

        db.query(q, [values], (err,data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
        });
    });
};