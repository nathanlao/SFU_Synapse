import React, { useEffect, useState } from "react";
import "./CommunityBrowser.css"

export default function CommunityBrowser({notifyClosure}) {
    const views = {
        browse: { name: 'browse', heading: 'Browse communities' },
        create: { name: 'create', heading: 'Create your own community' }
    }

    const [view, setView] = useState(views.browse)

    // community config
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('') // pass as bio for POST request
    const [photo, setPhoto] = useState(null)
    const [visibility, setVisibility] = useState(false) // private: false, public: true

    useEffect(() => {
        if(view.name === views.browse.name) {
            console.log('fetch list of communities')

            async function fetchCommunityInfo() {
                const response = await fetch('/api/community/browse')
                const data = await response.json()

                if(response.status === 200) {
                    console.log('list of communities:')
                    console.log(data)
                }else if(response.status === 409) {
                    console.log(data)
                    // TODO: display message (no communities have been created! Go ahead and create the first community!)
                }else {
                    alert(data)
                    console.log('Failed to fetch community data')
                }
            }

            fetchCommunityInfo()

        }
    }, [view])

    function handleCreateCommunity() {
        console.log('creating your community')

        async function createCommunity() {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ community_name: name, bio: desc, photo: photo, visibility: visibility })
            }
            const resposne = await fetch('/api/community/add', options)
            const data = await resposne.json()

            if(resposne.status !== 200) {
                return alert(data)
            }
            return alert(data) // success
        }


        // createCommunity()
    }

    const communityList = () => {
        return (
            <>
                <ul>
                    <li>Community 1</li>
                    <li>Community 2</li>
                    <li>Community 3</li>
                    <li>Community 4</li>
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
                    <input type="text" className="form-control" />
                    <label htmlFor="">Community description</label>
                    <input type="text" className="form-control" />
                </form>
                <div className="controller">
                    <button type="button" className="btn" onClick={() => {setView(views.browse)}}>Browse</button>
                    <button type="button" className="btn" onClick={handleCreateCommunity}>Submit</button>
                </div>
            </>
        )
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