const db = require('../db/connection.db').pool

// POST /auth
const RegisterEmail = (req, res) => {
    console.log('Received request: RegisterEmail')

    const email = req.body.email
    const code = authCode()
    const time = expires(10)
    console.log(email, code, time)
    const query = 'INSERT INTO AuthCodes (email, code, expires) VALUES (?, ?, ?)'

    db.query(query, [email, code, time], (err) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json('Email registration completed')
    })
}

// helper functions
function authCode() {
    var code = '';

    // append 2 alphabets
    code += (randomChar() + randomChar()).toUpperCase()
    
    // append random digits
    const len = 4;
    for(let i=0; i < len; i++) {
        code += randomDigit()
    }
    
    return code
}

function randomChar() {
	const alphabet = "abcdefghijklmnopqrstuvwxyz"
	const randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
    return randomCharacter.toUpperCase()
}

function randomDigit() {
	const num = Math.floor(Math.random() * 10) + 1
    return num.toString()
}

function expires(minutes) {
    const time = new Date()
    return time.setMinutes(time.getMinutes() + minutes)
}



module.exports = { RegisterEmail }