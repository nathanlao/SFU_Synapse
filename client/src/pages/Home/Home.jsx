import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"
import activeIcon from "../../images/active-connection-icon.png";
import pendingIcon from "../../images/pending-connection-icon.png";
import inactiveIcon from "../../images/inactive-connection-icon.png";

import crownIcon from "../../images/crown.png"
import privateIcon from "../../images/lock-color.png"

export default function Home() {
    const navigate = useNavigate()

    // data
    const [user, setUser] = useState({})
    const [connections, setConnections] = useState([])
    const [courses, setCourses] = useState([])
    const [communities, setCommunities] = useState([])

    useEffect(() => {
        async function init() {
            console.log('initialization: Home')
            const year = 2023
            const term = 'spring'
            const response = await fetch(`/api/home/${year}/${term}`)
            const data = await response.json()

            if(response.status !== 200) {
                return alert(data)
            }

            console.log(data.user)
            console.log(data.connections)
            console.log(data.courses)
            console.log(data.communities)

            setUser(data.user)
            setConnections(data.connections)
            setCourses(data.courses)
            setCommunities(data.communities)
        }

        init()

    }, [])

    function navigateToSettings() {
        navigate('/setting/edit-profile')
    }

    // const userViewer = () => {
    //     async function fetchUserDetails() {
    //         console.log('fetchUserDetails')
    //     }
    //     return (
    //         <div className="user-viewer">
    //             <div className="flex">
    //                 <img src="/images/default/default-user-photo.png" alt="" />
    //                 <div>
    //                     <p>Lincoln Pholips</p>
    //                     <p>lincolnP312</p>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div className="home">
            <h2>Dashboard</h2>
            <div className="dashboard">
                <section className="user-info pannel">
                    <section className="profile">
                        <div className="profile-summary">
                            <img src={user.photo} alt="" />
                            <div>
                                <p id="name">{user.first_name} {user.last_name}</p>
                                <p id="username">{user.username}</p>
                            </div>
                        </div>
                        <button type="button" className="btn" onClick={navigateToSettings}>Edit profile</button>
                    </section>
                    {user.bio && <p id="bio">{user.bio}</p>}
                </section>
                <section className="connections pannel">
                    <h3>Connections</h3>
                    <section className="active-connections">
                        <h5 className="active"><img src={activeIcon} className="colored-connection-icon" alt="" /> Active</h5>
                        <ul>
                            {connections.filter((item) => {
                                return item.status === 'active'
                            }).map((item) => (
                                <li id={item.username} key={item.username}>
                                    <div className="summary">
                                        <img src={item.photo} alt="" />
                                        <div>
                                            <p className="name">{item.first_name} {item.last_name}</p>
                                            <p>{item.username}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            <li>
                                <div className="summary">
                                    <img src="/images/default/default-user-photo.png" alt="" />
                                    <div>
                                        <p className="name">Lincoln Pholips</p>
                                        <p>lincolnP312</p>
                                    </div>
                                </div>
                                <button type="button" className="btn">view</button>
                            </li>
                            <li>
                                <div className="summary">
                                    <img src="/images/default/default-user-photo.png" alt="" />
                                    <div>
                                        <p className="name">Lincoln Pholips</p>
                                        <p>lincolnP312</p>
                                    </div>
                                </div>
                                <button type="button" className="btn">view</button>
                            </li>
                            <li>
                                <div className="summary">
                                    <img src="/images/default/default-user-photo.png" alt="" />
                                    <div>
                                        <p className="name">Lincoln Pholips</p>
                                        <p>lincolnP312</p>
                                    </div>
                                </div>
                                <button type="button" className="btn">view</button>
                            </li>
                            <li>
                                <div className="summary">
                                    <img src="/images/default/default-user-photo.png" alt="" />
                                    <div>
                                        <p className="name">Lincoln Pholips</p>
                                        <p>lincolnP312</p>
                                    </div>
                                </div>
                                <button type="button" className="btn">view</button>
                            </li>


                        </ul>
                    </section>
                    <section className="pending-connections">
                        <h5 className="pending"><img src={pendingIcon} className="colored-connection-icon" alt="" />Pending</h5>
                        <ul>
                            {connections.filter((item) => {
                                return item.status === 'pending'
                            }).map((item) => (
                                <li id={item.username} key={item.username}>
                                    <div className="summary">
                                        <img src={item.photo} alt="" />
                                        <div>
                                            <p className="name">{item.first_name} {item.last_name}</p>
                                            <p>{item.username}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            <li>
                                <div className="summary">
                                    <img src="/images/default/default-user-photo.png" alt="" />
                                    <div>
                                        <p className="name">Lincoln Pholips</p>
                                        <p>lincolnP312</p>
                                    </div>
                                </div>
                                <button type="button" className="btn">view</button>
                            </li>
                            <li>
                                <div className="summary">
                                    <img src="/images/default/default-user-photo.png" alt="" />
                                    <div>
                                        <p className="name">Lincoln Pholips</p>
                                        <p>lincolnP312</p>
                                    </div>
                                </div>
                                <button type="button" className="btn">view</button>
                            </li>

                        </ul>
                    </section>
                    <section className="inactive-connections">
                        <h5 className="inactive"><img src={inactiveIcon} className="colored-connection-icon" alt="" />Inactive</h5>
                        <ul>
                            {connections.filter((item) => {
                                return item.status === 'inactive'
                            }).map((item) => (
                                <li id={item.username} key={item.username}>
                                    <div className="summary">
                                        <img src={item.photo} alt="" />
                                        <div>
                                            <p className="name">{item.first_name} {item.last_name}</p>
                                            <p>{item.username}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            <li>
                                <div className="summary">
                                    <img src="/images/default/default-user-photo.png" alt="" />
                                    <div>
                                        <p className="name">Lincoln Pholips</p>
                                        <p>lincolnP312</p>
                                    </div>
                                </div>
                                <button type="button" className="btn">view</button>
                            </li>
                        </ul>
                    </section>
                </section>
                <section className="groups pannel">
                    <h3>Groups</h3>
                    <section className="course-groups">
                        <h5>Course</h5>
                        <ul>
                            {courses.map((course) => (
                                <li id={course.course_id}  key={course.course_id}>
                                    <div className="summary">
                                        <img src={course.photo} alt="" />
                                        <div>
                                            <p className="name">{course.group_name}</p>
                                            <p>{course.group_description}</p>
                                        </div>
                                    </div>
                                    <button type="button" className="btn">view</button>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="community-groups">
                        <h5>Community</h5>
                        <ul>
                            {communities.map((community) => (
                                <li id={community.community_id}  key={community.community_id}>
                                    <div className="summary">
                                        <img src={community.photo} alt="" />
                                        <div>
                                            <p className="name">{community.group_name}</p>
                                            <p>{community.group_description}</p>
                                        </div>
                                    </div>
                                    <div className="icon-buttons">
                                        {community.created_by === user.user_id && <img className="status-icon-img" src={crownIcon} alt="" />}
                                        {community.visibility === 'private' && <img className="status-icon-img" src={privateIcon} alt="" />}
                                        <button type="button" className="btn">view</button>
                                    </div>
                                </li>
                            ))}
                            <li>
                                <div className="summary">
                                    <img src="/images/default/community/default-community-photo2.png" alt="" />
                                    <div>
                                        <p className="name">CMPT372 D100</p>
                                        <p>Web II - Server-side Development</p>
                                    </div>
                                </div>
                                <div className="icon-buttons">
                                    <img className="status-icon-img" src={crownIcon} alt="" />
                                    <img className="status-icon-img" src={privateIcon} alt="" />
                                    <button type="button" className="btn">view</button>
                                </div>
                            </li>
                            <li>
                                <div className="summary">
                                    <img src="/images/default/community/default-community-photo2.png" alt="" />
                                    <div>
                                        <p className="name">CMPT372 D100</p>
                                        <p>Web II - Server-side Development</p>
                                    </div>
                                </div>
                                <div className="icon-buttons">
                                    <img className="status-icon-img" src={privateIcon} alt="" />
                                    <button type="button" className="btn">view</button>
                                </div>
                            </li>
                            <li>
                                <div className="summary">
                                    <img src="/images/default/community/default-community-photo2.png" alt="" />
                                    <div>
                                        <p className="name">CMPT372 D100</p>
                                        <p>Web II - Server-side Development</p>
                                    </div>
                                </div>
                                <div className="icon-buttons">
                                    <button type="button" className="btn">view</button>
                                </div>
                            </li>

                        </ul>
                    </section>
                </section>
            </div>
        </div>
    )
}