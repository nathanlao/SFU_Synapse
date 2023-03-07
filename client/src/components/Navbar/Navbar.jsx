import React from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMessage, faGroupArrowsRotate, faGear} from '@fortawesome/free-solid-svg-icons'
import tempPic from "../../images/temp.png"

import './Navbar.css'

export default function Navbar() {
    return (
        <nav className="nav-container">
            <img src={tempPic} alt="sfu synapse logo"/>
            <div className="logo-container">
                <Link to="/">
                    <FontAwesomeIcon icon={faHouse}/>
                </Link>
                <Link to="connections">
                    <FontAwesomeIcon icon={faMessage}/>
                </Link>
                <Link to="groups">
                    <FontAwesomeIcon icon={faGroupArrowsRotate}/>
                </Link>
            </div>
            <Link to="setting" className="setting">
                <FontAwesomeIcon icon={faGear} />
            </Link>
        </nav>
    )
}