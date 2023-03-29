import React, { useEffect, useState } from 'react'
import defProfilePhoto from "../../images/default_profile_picture.png"
import './EditProfile.css'
import PopupWindow from './PopupWindow'

export default function EditProfile() {
    const username = 'testuser' // for now
    const wordLimit = 150
    const [wordCount, setWordCount] = useState(0)
    const [photo, setPhoto] = useState('/images/default/default-user-photo.png')

    const [popupWindowState, setPopupWindowState] = useState(false)

    function showPopupWindow() {
        setPopupWindowState(true)
    }

    const closePopupWindow = () => {
        setPopupWindowState(false)
    }

    useEffect(() => {
        async function init() {
            // get user profile photo
            const result = await fetch(`/api/user-photo/${username}`)
            if(result.status === 200) {
                const data = await result.json()
                console.log(data)
                setPhoto(data)
            }else {
                console.log(result.statusText)
            }
        }

        init()
    }, [])

    function handleBioChange(event) {
        setWordCount(event.target.value.length)
    }

    function updatePhoto(path) {
        setPhoto(path)
    }


    return(
        <div className="edit-profile">
            <div className="editor-window">
                <div className="left-column profile-image">
                    <img src={photo} alt="user profile photo" />
                </div>
                <div className="right-column profile-username">
                    <p>LobsterBoy</p>
                    <a onClick={showPopupWindow}>Change profile photo</a>
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
                    <textarea name="" id="" cols="30" rows="5" onChange={handleBioChange}></textarea>
                    <small><span className={wordCount <= wordLimit ? 'valid-length' : 'invalid-length'}>{wordCount}</span> / {wordLimit}</small>
                    <button type='button' id='saveProfileBtn' disabled={wordCount > wordLimit}>Save</button>
                </div>
            </div>

            {popupWindowState && <PopupWindow notifyClosure={closePopupWindow} notifyChange={updatePhoto} username={username} />}
        </div>
    )
}