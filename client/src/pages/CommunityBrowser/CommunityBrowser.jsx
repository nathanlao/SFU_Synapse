import React, { useEffect, useState } from "react";
import "./CommunityBrowser.css"

export default function CommunityBrowser({notifyClosure}) {
    const views = {
        browse: { name: 'browse', heading: 'Browse communities' },
        create: { name: 'create', heading: 'Create your own community' }
    }

    const [view, setView] = useState(views.browse)

    // community info
    const [list, setList] = useState([])

    // community config
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('') // pass as bio for POST request
    const [photo, setPhoto] = useState({})
    const [visibility, setVisibility] = useState('public')

    useEffect(() => {
        if(view.name === views.browse.name) {
            console.log('fetch list of communities')

            async function fetchCommunityInfo() {
                const response = await fetch('/api/community/browse')
                const data = await response.json()

                if(response.status === 200) {
                    console.log('list of communities:')
                    console.log(data)
                    setList(data)
                }else if(response.status === 409) {
                    console.log(data)
                    // TODO: display message (no communities have been created! Go ahead and create the first community!)
                }else {
                    alert(data)
                    console.log('Failed to fetch community data')
                }
            }

            // fetchCommunityInfo()

        }
    }, [view])

    async function handleCreateCommunity() {
        console.log('creating your community')

        async function createCommunity() {
            try {
                const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ community_name: name, bio: desc, photo: photo, visibility: visibility })
                }
                const resposne = await fetch('/api/community/add', options)
                const data = await resposne.json() // return a group_id

                console.log(data)
                if(resposne.status !== 200) {
                    return alert(data)
                }
    
                return data // success
            } catch (err) {
                console.log(err)
            }
        }
        const group_id = await createCommunity()
        console.log("🚀 ~ file: CommunityBrowser.jsx:88 ~ handleCreateCommunity ~ group_id:", group_id)

        if(photo.data) {
            console.log("🚀 ~ file: CommunityBrowser.jsx:74 ~ handleCreateCommunity ~ photo.data:", photo.data)
            const data = new FormData()
            data.append('file', photo.data)
    
            const options = {
                method: 'POST',
                body: JSON.stringify({ community_id: group_id, data: data })
            }
            const response = await fetch('/api/community-photo', options)
            const result = await response.json()
    
            if(response.status !== 200) {
                alert(result)
                return
            }
            console.log('Profile photo saved')
        }
    }

    function handleJoinCommunity(event) {
        console.log('Join community (id: ' + event.target.id + ')')
    }

    const communityList = () => {
        return (
            <>
                <ul className="community-list">
                    {/* {list.map((community) => (
                        <div className="community" id={community.community_id}>
                            <img src={community.photo} alt="" />
                            {community.community_name}
                            <button type="button" onClick={handleJoinCommunity}>Join</button>
                        </div>
                    ))} */}
                    {/* <li>
                        <div className="left">
                            <img src="/images/default/community/default-community-photo1.png" alt="" />
                            Community 1
                        </div>
                        <button type="button" className="btn" onClick={handleJoinCommunity}>Join</button>
                    </li>
                    <li>
                        <div className="left">
                            <img src="/images/default/community/default-community-photo1.png" alt="" />
                            Community 2
                        </div>
                        <button type="button" className="btn" onClick={handleJoinCommunity}>Join</button>
                    </li>
                    <li>
                        <div className="left">
                            <img src="/images/default/community/default-community-photo1.png" alt="" />
                            Community 3
                        </div>
                        <button type="button" className="btn" onClick={handleJoinCommunity}>Join</button>
                    </li>
                    <li>
                        <div className="left">
                            <img src="/images/default/community/default-community-photo1.png" alt="" />
                            Community 4
                        </div>
                        <button type="button" className="btn" onClick={handleJoinCommunity}>Join</button>
                    </li> */}

                </ul>
                <div className="controller">
                    <button type="button" className="btn" onClick={() => {setView(views.create)}}>Create your own</button>
                </div>
            </>
        )
    }

    const createCommunityForm = () => {
        return (
            <>
                <form>
                    <label htmlFor="">Community name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="">Community description</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <div className="visibility-config">
                        <label htmlFor="">Private</label>
                        <label className="switch">
                            <input 
                                type="checkbox" 
                                onChange={(e) => setVisibility(e.target.checked ? 'private' : 'public')}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    
                    <p><label htmlFor="">Profile photo</label></p>
                    {selectPhoto()}
                </form>
                <div className="controller">
                    <button type="button" className="btn" onClick={() => {setView(views.browse)}}>Browse</button>
                    <button type="button" className="btn" onClick={handleCreateCommunity}>Submit</button>
                </div>
            </>
        )
    }

    function handleFileChange(event) {
        if(event.target.files && event.target.files[0]) {
            const file = event.target.files[0]

            if(sizeInKB(file.size) <= 200) {
                const img = {
                    preview: URL.createObjectURL(file),
                    data: file
                }
                setPhoto(img)
                console.log(photo)
            }else {
                setPhoto({})
                event.target.value = ''
                alert('[File size: ' + sizeInKB(file.size) + ' KB] The maximum file size allowed is 200KB.')
            }
        }else {
            setPhoto({})
        }
    }

    const selectPhoto = () => {
        return (
            <div className="select-photo">
                <div className="preview-area">
                    <p>Preview</p>
                    <img src={photo.preview} alt="" />
                </div>
                <input type="file" className="form-control" accept="images/*" onChange={handleFileChange} />
            </div>
        )
    }

    function sizeInKB(bytes, decimals = 2) {
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        return parseFloat((bytes / k).toFixed(dm))
    }


    return(
        <div className="community-browser">
            <div className="window-body">
            <div id="closeBtn" onClick={notifyClosure}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </div>
                <section>
                    <h2>{view.heading}</h2>
                    <div>
                        {view.name === views.browse.name && communityList()}
                        {view.name === views.create.name && createCommunityForm()}
                    </div>
                </section>
            </div>
        </div>
    )
}