import React from "react";
import './Signup.css'


export default function Signup() {
    return (
        <>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username"/>
                <p className="err-msg"></p>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password"/>
                <p className="err-msg"></p>
            </div>
            <div>
                <label htmlFor="confirmedPassword">Confirm password</label>
                <input type="password" id="confirmedPassword"/>
                <p className="err-msg"></p>
            </div>
            <div>
                <label htmlFor="fname">First name</label>
                <input type="text" id="fname"/>
                <p className="err-msg"></p>
            </div>
            <div>
                <label htmlFor="lname">Last name</label>
                <input type="text" id="lname"/>
                <p className="err-msg"></p>
            </div>
            <div>
                <label htmlFor="email">Email <span>*valid SFU email required</span></label>
                <input type="email" id="email"/>
                <p className="err-msg"></p>
            </div>
            <section className="email-req-details">
                <h5>SFU Email Requirement</h5>
                <p>SFU Synapse is a place for SFU students to build long lasting connections. We require that every user has a valid SFU email. Click on Send code below and enter the code sent to your email address.</p>
                <div className="input-box">
                    <p className="inline-label">CODE</p>
                    <input type="number" id="code" />
                </div>
                <p className="send-code-btn-wrapper">
                    <button type="button" id="sendCodeBtn">Send code</button>
                </p>
            </section>
            <button type="button" id="signupBtn">Sign up</button>
            <small>Already have an account? <a href="/login">Log in</a></small>
        </>
    )
}
