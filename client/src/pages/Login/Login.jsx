import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

export default function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [userpass, setPassword] = useState('')

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    
    function validateLogin() {
        console.log('validating login')
        console.log(`username: ${username}, password: ${userpass}`)

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, userpass: userpass})
        }

        fetch('http://localhost:3000/login', options).then(res => {
            if(res.status === 200) {
                navigate("/", {replace: true})
            }else {
                // show error message in view
            }
        })

    }


    return (
        <>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={handleUsernameChange}/>
                <p className="err-msg"></p>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={userpass} onChange={handlePasswordChange}/>
                <p className="err-msg"></p>
            </div>

            <button type="button" id="loginBtn" onClick={validateLogin}>Log in</button>
            <small>Don't have an account? <a href="/signup">Sign up</a></small>
        </>
    )
}
