import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'

export default function Login() {
    const navigate = useNavigate()
    const [loginFormData, setLoginFormData] = useState({
        username: "",
        password: ""
    })

    function handleInputChange(event) {
        const { name, value } = event.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleFormSubmit(event) {
        event.preventDefault()

        //TODO: GET real data from server and proceed to main content
        console.log(loginFormData)
        localStorage.setItem("login", true)

        // make http POST request to http://localhost:3000
        // handle response from server
        // if response returns login status SUCCESS then navigate to the /
        // if response returns login status INTERNALERR then display message 'Something went wrong with the server. Please try again later'
        // else display error message 'Incorrect username or password'
        navigate("/", {replace: true})
    }

    // NOTE: ABOVE FUNCTIONS ARE STILL INCOMPLETE

    return (
        <>
            <p>
                <label htmlFor="username">Username</label>
                <input type="text" id="username"/>
                <p className="err-msg"></p>
            </p>
            <p>
                <label htmlFor="password">Password</label>
                <input type="password" id="password"/>
                <p className="err-msg"></p>
            </p>

            <button type="button" id="loginBtn">Log in</button>
            <small>Don't have an account? <a href="/signup">Sign up</a></small>
        </>
    )
}
