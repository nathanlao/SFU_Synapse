import React from 'react'
import defProfilePhoto from "../../images/default_profile_picture.png"
import './ChangePassword.css'

export default function ChangePassword() {
    return(
        <div className="change-password">
            <div className="editor-window">
                <div className="left-column profile-image">
                    <img src={defProfilePhoto} alt="" />
                </div>
                <div className="right-column profile-username">
                    <p>LobsterBoy</p>
                </div>
                {/* old password */}
                <div className="left-column input-label">
                    <label htmlFor="">Old password</label>
                </div>
                <div className="right-column pass-input">
                    <input type="password" />
                </div>
                {/* new password */}
                <div className="left-column input-label">
                    <label htmlFor="">New password</label>
                </div>
                <div className="right-column pass-input">
                    <input type="password" />
                </div>
                {/* confirm new password */}
                <div className="left-column input-label">
                    <label htmlFor="">Confirm new password</label>
                </div>
                <div className="right-column pass-input">
                    <input type="password" />
                    <button type='button' id='saveProfileBtn'>Change password</button>
                    <p><a href="">Forgot password?</a></p>
                </div>
            </div>
        </div>
    )
}