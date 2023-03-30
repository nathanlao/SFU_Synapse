import React, { useState, useEffect } from "react";
import './ChangePassword.css'

var md5 = require('md5');

export default function ChangePassword() {
    const username = 'testuser' // for now
    const [photo, setPhoto] = useState('/images/default/default-user-photo.png')

    // form data
    const [isSamePassword, setIsSamePassword] = useState(true);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPasssword, setConfirmPassword] = useState('');
    const [passContainsUppercase, setPassContainsUppercase] = useState(false);
    const [passContainsLowercase, setPassContainsLowercase] = useState(false);
    const [passContainsNumber, setPassContainsNumber] = useState(false);
    const [passContainsSymbol, setPassContainsSymbol] = useState(false);
    const [passContainsEightChars, setPassContainsEightChars] = useState(false);
    const [passErrorVisible, setPassErrorVisible] = useState(true);

    useEffect(()=> {
        async function init() {
            const response = await fetch('/api/user-photo')
            const result = await response.json()
            
            if(response.status !== 200) {
                alert(result)
                return
            }

            setPhoto(result)
        }
        init()
    }, [])


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

    function handlePasswordChange(event) {
        setNewPassword(event.target.value);
    }

    function handleConfirmPasswordChange(event) {
        setConfirmPassword(event.target.value);
    }

    useEffect(() => {
        if (confirmPasssword !== '' && newPassword !== confirmPasssword) {
            setIsSamePassword(false);
        } else if (newPassword === confirmPasssword) {
            setIsSamePassword(true);
        }
        containsUppercase(newPassword) ? setPassContainsUppercase(true) : setPassContainsUppercase(false);
        containsLowercase(newPassword) ? setPassContainsLowercase(true) : setPassContainsLowercase(false);
        containsNumber(newPassword) ? setPassContainsNumber(true) : setPassContainsNumber(false);
        containsSymbol(newPassword) ? setPassContainsSymbol(true) : setPassContainsSymbol(false);
        containsEightChars(newPassword) ? setPassContainsEightChars(true) : setPassContainsEightChars(false);

    }, [newPassword, confirmPasssword]);

    useEffect(() => {
        if (passContainsUppercase && passContainsLowercase && passContainsNumber && passContainsSymbol && passContainsEightChars)
            setPassErrorVisible(false);
        else
            setPassErrorVisible(true);
    }, [passContainsUppercase, passContainsLowercase, passContainsNumber, passContainsSymbol, passContainsEightChars]);

    function handleChangePassword() {
        if (!isSamePassword || confirmPasssword === '' || passErrorVisible) {
            return;
        }
        /*
        const username = document.getElementById("username").value;
        const oldPassword = document.getElementById("old-password").value;

        // todo: check to see if the md5 of oldPassword matches the md5 of the password in database
        // if it does then change password...

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, userpass: md5(newPassword)})
        }

        fetch('/api/change-password', options).then(res => {
            if(res.status === 200) {
                return res.text();
            } else {
                // show error message in view
            }
        })
        .then((text) => {
            console.log(text);
            navigate("/setting/change-password", {replace: true});
        });
        */
    }

    console.log("ChangePassword");

    return(
        <div className="change-password">
            <div className="editor-window">
                <div className="left-column profile-image">
                    <img src={photo} alt="" />
                </div>
                <div className="right-column profile-username">
                    <p id="username">LobsterBoy</p>
                </div>
                {/* old password */}
                <div className="left-column input-label">
                    <label htmlFor="">Old password</label>
                </div>
                <div className="right-column pass-input">
                    <input type="password" id="old-password"/>
                </div>
                {/* new password */}
                <div className="left-column input-label">
                    <label htmlFor="">New password</label>
                </div>
                <div className="right-column pass-input">
                    <input type="password" id="new-password" onChange={handlePasswordChange}/>
                    {passErrorVisible && <div className="change-pass-error-box">
                        {passErrorVisible && <div className="pass-error-text"><b>Your password needs to:</b></div>}
                        {!passContainsUppercase && <div><li>Contain an uppercase letter</li></div>}
                        {!passContainsLowercase && <div><li>Contain a lowercase letter</li></div>}
                        {!passContainsNumber && <div><li>Contain a number</li></div>}
                        {!passContainsSymbol && <div><li>Contain a symbol</li></div>}
                        {!passContainsEightChars && <div><li>Be at least 8 characters</li></div>}
                    </div>}
                </div>
                {/* confirm new password */}
                <div className="left-column input-label">
                    <label htmlFor="">Confirm new password</label>
                </div>
                <div className="right-column pass-input">
                    <input type="password" onChange={handleConfirmPasswordChange}/>
                    {!isSamePassword && <div className="pass-match-error">*Passwords do not match</div> }
                    <button type='button' id='saveProfileBtn' onClick={handleChangePassword}>Change password</button>
                    <p><a href="">Forgot password?</a></p>
                </div>
            </div>
        </div>
    )
}