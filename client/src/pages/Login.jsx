import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import appLogo from "../images/app_logo.png"

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

    return (
        <div>
            <h1>Log in</h1>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Username:
                    <input 
                        type="text" 
                        name="username"
                        value={loginFormData.username}
                        onChange={handleInputChange}    
                    />
                </label>
                <label>
                    Password:
                    <input 
                        type="password" 
                        name="password"
                        value={loginFormData.password}
                        onChange={handleInputChange}
                    />
                </label>
                <button>Log in</button>
            </form>
            {/* TODO: hard coded link */}
            <a href="/">Forgot password?</a>
            <a href="/">Don't have an account</a>
            <img 
                alt="login in SFU Synapse logo"
                src={appLogo}    
            />
        </div>
    )
}