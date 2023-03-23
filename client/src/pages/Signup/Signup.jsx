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
    const [passContainsUppercase, setPassContainsUppercase] = useState(false);
    const [passContainsLowercase, setPassContainsLowercase] = useState(false);
    const [passContainsNumber, setPassContainsNumber] = useState(false);
    const [passContainsSymbol, setPassContainsSymbol] = useState(false);
    const [passContainsEightChars, setPassContainsEightChars] = useState(false);
    const [passErrorVisible, setPassErrorVisible] = useState(true);

    useEffect(() => {
        if (email.endsWith('@sfu.ca')) {
            // ends with @sfu.ca display success
            setIsSfuEmail(true);
        } else {
            // does not end with @sfu.ca display failure
            setIsSfuEmail(false);
        }
    }, [email])

    function containsUppercase(str) {
        return /[A-Z]/.test(str);
    }

    function containsLowercase(str) {
        return /[a-z]/.test(str);
    }

    function containsNumber(str) {
        return /[0-9]/.test(str);
    }

    function containsSymbol(str) {
        return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(str);
    }

    function containsEightChars(str) {
        return str.length >= 8;
    }

    useEffect(() => {
        if (confirmPasssword !== '' && password !== confirmPasssword) {
            setIsSamePassword(false);
        } else if (password === confirmPasssword) {
            setIsSamePassword(true);
        }
        containsUppercase(password) ? setPassContainsUppercase(true) : setPassContainsUppercase(false);
        containsLowercase(password) ? setPassContainsLowercase(true) : setPassContainsLowercase(false);
        containsNumber(password) ? setPassContainsNumber(true) : setPassContainsNumber(false);
        containsSymbol(password) ? setPassContainsSymbol(true) : setPassContainsSymbol(false);
        containsEightChars(password) ? setPassContainsEightChars(true) : setPassContainsEightChars(false);

    }, [password, confirmPasssword]);

    useEffect(() => {
        if (passContainsUppercase && passContainsLowercase && passContainsNumber && passContainsSymbol && passContainsEightChars)
            setPassErrorVisible(false);
        else
            setPassErrorVisible(true);
    }, [passContainsUppercase, passContainsLowercase, passContainsNumber, passContainsSymbol, passContainsEightChars]);
    

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
        if (!isSamePassword || confirmPasssword === '' || !isSfuEmail || passErrorVisible) {
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

        fetch('/api/signup', options).then(res => {
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
                {passErrorVisible && <div className="pass-error-box">
                    {passErrorVisible && <div className="pass-error-text"><b>Your password needs to:</b></div>}
                    {!passContainsUppercase && <div><li>Contain an uppercase letter</li></div>}
                    {!passContainsLowercase && <div><li>Contain a lowercase letter</li></div>}
                    {!passContainsNumber && <div><li>Contain a number</li></div>}
                    {!passContainsSymbol && <div><li>Contain a symbol</li></div>}
                    {!passContainsEightChars && <div><li>Be at least 8 characters</li></div>}
                </div>}
                <p className="err-msg"></p>
            </div>
            <div>
                <label htmlFor="confirmedPassword">Confirm password</label>
                <input type="password" id="confirmedPassword" onChange={handleConfirmPasswordChange}/>
                {!isSamePassword && <div className="confirm-pass-error-box"><li>Passwords do not match</li></div>}
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
