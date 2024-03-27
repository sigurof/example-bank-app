import {credentialsAtom} from "../state.ts";
import {useAtom} from "jotai";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


export const ClientPages = () => {
    const [credentials, _] = useAtom(credentialsAtom)
    const username = credentials.username
    const navigate = useNavigate()
    useEffect(() => {
        if (!username) navigate("/landing/login")
    }, [username]);
    return (
        <div>
            <h1>Client Pages</h1>
            <h2>You are {username}</h2>
        </div>
    )
}
