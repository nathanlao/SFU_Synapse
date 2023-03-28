import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Disconnect() {

    const { connectionId } = useParams()
    const nagivate = useNavigate()

    // DELETE request
    async function removeConnection() {
        try {
            const response = await fetch(`/api/connections/${connectionId}/setting`, {method: "DELETE"})
            if (!response.ok) {
                // eslint-disable-next-line no-throw-literal
                throw {
                    message: "Failed to delete connection", 
                    statusText: response.statusText,
                    status: response.status
                }
            }
            const data =  await response.json()
            console.log("Disconnect successfully with Id:", connectionId)
            nagivate("/connections", {replace: true})
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <h1>UI page to confirm disconnection</h1>
            <Button onClick={removeConnection}>Disconnect</Button>
        </>
    )
}