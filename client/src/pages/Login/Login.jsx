import React from "react";
import './Login.css'

export default function Login() {
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
