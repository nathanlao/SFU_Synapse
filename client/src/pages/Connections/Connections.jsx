import React from "react";
import { useLocation } from "react-router-dom";
        
export default function Connections() {
    let location = useLocation();
    console.log(location);
    return (
        <h1>Connections page goes here</h1>
    )
}