import React, { useState } from 'react'
import defProfilePhoto from "../../images/default_profile_picture.png"
import './EditProfile.css'

export default function EditProfile() {
    const [wordCount, setWordCount] = useState(0)


    return(
        <div className="edit-profile">
            <div className="editor-window">
                <div className="left-column profile-image">
                    <img src={defProfilePhoto} alt="" />
                </div>
                <div className="right-column profile-username">
                    <p>LobsterBoy</p>
                    <a href="">Change profile photo</a>
                </div>
                <div className="left-column profile-input-label">
                <label htmlFor="">Username</label>
                </div>
                <div className="right-column profile-input">
                    <input type="text" />
                </div>
                <div className="left-column profile-textarea-label">
                    <label htmlFor="">Bio</label>
                </div>
                <div className="right-column profile-textarea">
                    <textarea name="" id="" cols="30" rows="5"></textarea>
                    <small><span className='valid-length'>{wordCount}</span> / 150</small>
                    <button type='button' id='saveProfileBtn'>Save</button>
                </div>
            </div>
        </div>
    )
}