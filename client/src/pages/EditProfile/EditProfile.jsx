import React, { useEffect, useState } from 'react'
import './EditProfile.css'
import PopupWindow from './PopupWindow'

export default function EditProfile() {
    const wordLimit = 150
    const [wordCount, setWordCount] = useState(0)
    const [photo, setPhoto] = useState('/images/default/default-user-photo.png')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')

    const [popupWindowState, setPopupWindowState] = useState(false)

    function showPopupWindow() {
        setPopupWindowState(true)
    }

    const closePopupWindow = () => {
        setPopupWindowState(false)
    }

    useEffect(() => {
        async function init() {
            // get user info
            const response = await fetch('/api/setting')
            const data = await response.json()

            if(response.status !== 200) {
                return alert(data)
            }

            console.log(data[0].username, data[0].bio, data[0].photo)
            setUsername(data[0].username)
            setPhoto(data[0].photo)
            if(data[0].bio) {
                setBio(data[0].bio)
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
                    <p>{username}</p>
                    <a onClick={showPopupWindow}>Change profile photo</a>
                </div>
                <div className="left-column profile-input-label">
                <label htmlFor="">Username</label>
                </div>
                <div className="right-column profile-input">
                    <input type="text" defaultValue={username} />
                </div>
                <div className="left-column profile-textarea-label">
                    <label htmlFor="">Bio</label>
                </div>
                <div className="right-column profile-textarea">
                    <textarea name="" id="" cols="30" rows="5" defaultValue={bio} onChange={handleBioChange}></textarea>
                    <small><span className={wordCount <= wordLimit ? 'valid-length' : 'invalid-length'}>{wordCount}</span> / {wordLimit}</small>
                    <button type='button' id='saveProfileBtn' disabled={wordCount > wordLimit}>Save</button>
                </div>
            </div>

            {popupWindowState && <PopupWindow notifyClosure={closePopupWindow} notifyChange={updatePhoto} />}
        </div>
    )
}