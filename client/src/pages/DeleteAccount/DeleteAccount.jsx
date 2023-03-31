import React, { useState, useEffect } from "react";
import './DeleteAccount.css'

export default function DeleteAccount() {
    return (
        <div className="delete-account">
            <h2>Delete Synapse Account</h2>
            <div className="warning">
                <div className="warning-heading">Warning!</div>
                <div className="warning-message">Are you sure? Your profile and related account information will be deleted from our site. 
                However, messages will remain visible to other users in the chat.</div>
            </div>
            <p><strong>Enter your password to confirm account deletion.</strong></p>
            <label htmlFor="password">Password</label>
            <div className="grid">
                <input type="password" id="password" className="form-control" />
                <button type="button" className="btn btn-outline-danger">Delete account</button>
            </div>
        </div>
    )
}