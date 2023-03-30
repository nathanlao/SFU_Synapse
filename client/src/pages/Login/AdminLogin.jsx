import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requiresLogin } from "../../services/authentication.service";
import './AdminLogin.css';

// assets
import appLogo from "../../images/app_logo.png"

export default function AdminLogin() {
    const navigate = useNavigate()
    const [adminname, setAdminname] = useState('')
    const [adminpass, setPassword] = useState('')

    useEffect(() => {
        async function init() {
            // check login status
            const login = await requiresLogin('admin')
            if(!login) {
                navigate('/admin', { replace: true })
            }
        }
        init()
    }, [])

    function handleAdminnameChange(event) {
        setAdminname(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    
    function validateLogin() {
        console.log('validating admin login')
        console.log(`adminname: ${adminname}, password: ${adminpass}`)

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ adminname: adminname, adminpass: adminpass})
        }

        fetch('/api/admin/login', options).then(res => {
            if(res.status === 200) {
                navigate("/admin", {replace: true})
            }else {
                // show error message in view
            }
        })

    }


    return (
        <div className="admin-login">
            <form>
                <p className="form-header">Admin Login</p>
                <div>
                    <label htmlFor="username">Admin name</label>
                    <input type="text" id="username" value={adminname} onChange={handleAdminnameChange}/>
                    <p className="err-msg"></p>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={adminpass} onChange={handlePasswordChange}/>
                    <p className="err-msg"></p>
                </div>

                <button type="button" id="loginBtn" onClick={validateLogin}>Log in as administrator</button>
                <div className="logo-area">
                        <img src={appLogo} alt="" id="logoPrint" />
                    </div>
            </form>
        </div>
    )
}
