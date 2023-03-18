import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css';

export default function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [userpass, setPassword] = useState('')

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    
    function validateLogin() {
        console.log('validating login')
        console.log(`username: ${username}, password: ${userpass}`)

        //TODO: GET real data from server and proceed to main content
        // axios.post('http://localhost:3000/login').then(res => {
        //     const resStatus = res.status
        // })
        

        // make http POST request to http://localhost:3000
        // handle response from server
        // if response returns login status SUCCESS then navigate to the /
        // if response returns login status INTERNALERR then display message 'Something went wrong with the server. Please try again later'
        // else display error message 'Incorrect username or password'
        navigate("/", {replace: true})
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
