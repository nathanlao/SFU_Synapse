import React from "react";
import "./Home.css"
import activeIcon from "../../images/active-connection-icon.png";
import pendingIcon from "../../images/pending-connection-icon.png";
import inactiveIcon from "../../images/inactive-connection-icon.png";

export default function Home() {
    return (
        <div className="home">
            <h2>Dashboard</h2>
            <div className="dashboard">
                <section className="profile pannel">
                    <div className="profile-summary">
                        <img src="/images/default/default-user-photo.png" alt="" />
                        <div>
                            <p id="name">Arek kajda</p>
                            <p id="username">LobsterBoy</p>

                        </div>
                    </div>
                    <button type="button" className="btn">Edit profile</button>
                </section>
                <section className="connections pannel">
                    <h3>Connections</h3>
                    <section className="active-connections">
                        <h5 className="active"><img src={activeIcon} className="colored-connection-icon" alt="" /> Active</h5>
                        <ul>
                            <li>
                                <div className="profile-info">
                                    <img src="/images/default/default-user-photo.png" alt="" />
                                    <div>
                                        <p className="name">Lincoln Pholips</p>
                                        <p>lincolnP312</p>
                                    </div>
                                </div>
                                <button type="button" className="btn">view</button>
                            </li>
                            <li>
                                <div className="profile-info">
                                    <img src="/images/default/default-user-photo.png" alt="" />
                                    <div>
                                        <p className="name">Lincoln Pholips</p>
                                        <p>lincolnP312</p>
                                    </div>
                                </div>
                                <button type="button" className="btn">view</button>
                            </li>
                            <li>
                                <div className="profile-info">
                                    <img src="/images/default/default-user-photo.png" alt="" />
                                    <div>
                                        <p className="name">Lincoln Pholips</p>
                                        <p>lincolnP312</p>
                                    </div>
                                </div>
                                <button type="button" className="btn">view</button>
                            </li>
                            <li>
                                <div className="profile-info">
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
                            <li>
                                <div className="profile-info">
                                    <img src="/images/default/default-user-photo.png" alt="" />
                                    <div>
                                        <p className="name">Lincoln Pholips</p>
                                        <p>lincolnP312</p>
                                    </div>
                                </div>
                                <button type="button" className="btn">view</button>
                            </li>
                            <li>
                                <div className="profile-info">
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
                            <li>
                                <div className="profile-info">
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
                    </section>
                    <section className="community-groups">
                        <h5>Community</h5>
                    </section>
                </section>
            </div>
        </div>
    )
}