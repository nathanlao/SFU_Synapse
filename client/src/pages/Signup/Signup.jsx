import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css'

var md5 = require('md5');


export default function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isSfuEmail, setIsSfuEmail] = useState(false);
    const [isSamePassword, setIsSamePassword] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPasssword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (email.endsWith('@sfu.ca')) {
            // ends with @sfu.ca display success
            setIsSfuEmail(true);
        } else {
            // does not end with @sfu.ca display failure
            setIsSfuEmail(false);
        }
    }, [email])

    useEffect(() => {
        if (confirmPasssword !== '' && password !== confirmPasssword) {
            setIsSamePassword(false);
        } else {
            setIsSamePassword(true);
        }
    }, [password, confirmPasssword])

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function sendEmailCode() {
        // TODO: Insert code to send email.
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleConfirmPasswordChange(event) {
        setConfirmPassword(event.target.value);
    }

    function handleSignup() {
        if (!isSamePassword || confirmPasssword == '' || !isSfuEmail) {
            return;
        }
        const username = document.getElementById("username").value;
        const firstName = document.getElementById("fname").value;
        const lastName = document.getElementById("lname").value;

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, userpass: md5(password), first_name: firstName, last_name: lastName, email: email})
        }

        fetch('http://localhost:3000/signup', options).then(res => {
            if(res.status === 200) {
                return res.text();
            } else {
                // show error message in view
            }
        })
        .then((text) => {
            console.log(text);
            navigate("/", {replace: true});
        });
    }

    return (
        <>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username"/>
                <p className="err-msg"></p>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={handlePasswordChange}/>
                <p className="err-msg"></p>
            </div>
            <div>
                <label htmlFor="confirmedPassword">Confirm password</label>
                <input type="password" id="confirmedPassword" onChange={handleConfirmPasswordChange}/>
                {isSamePassword ? <p></p> :<p className="err-msg">*Passwords are not the same</p>}
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
                <input type="email" id="email" onChange={handleEmailChange}/>
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
                    <button type="button" id="sendCodeBtn" onClick={sendEmailCode}>Send code</button>
                    {isSfuEmail ? <span></span> : <span className="err-msg"><br></br>Invalid email</span>}
                </p>
            </section>
            <button type="button" id="signupBtn" onClick={handleSignup}>Sign up</button>
            <small>Already have an account? <a href="/login">Log in</a></small>
        </>
    )
}
