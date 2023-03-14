import React, { useState } from "react";
        
export default function Login() {
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
    }

    return (
        <div>
            <h1>Log in to your account</h1>
            <form onSubmit={handleFormSubmit}>
                <input 
                    type="text" 
                    name="username"
                    placeholder="Username"
                    value={loginFormData.username}
                    onChange={handleInputChange}    
                />
                <input 
                    type="password" 
                    name="password"
                    placeholder="Password"
                    value={loginFormData.password}
                    onChange={handleInputChange}
                />
                <button>Log in</button>
            </form>
        </div>
    )
}