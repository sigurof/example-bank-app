import {useState} from "react";
import {api} from "../api/api.ts";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {credentialsAtom} from "../state.ts";
import {useAtom} from "jotai";

const Error = styled.div`
    color: red;
`

export const LoginPage = () => {
    const [_, setCredentials] = useAtom(credentialsAtom)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const login = async () => {
        await api.login(username, password)
        setCredentials({username, password})
    }
    return (
        <div id="loginPage">
            <h1>Login Page</h1>
            <input
                placeholder={"username"}
                onChange={(e) => {
                    setUsername(e.target.value)
                }}/>
            <input
                placeholder={"password"}
                type="password"
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />
            <button onClick={() => login()
                .then(_ => {
                    navigate("/client")
                }).catch(err => {
                    setError(err)
                })
            }>Log in
            </button>
            {
                error && <Error>{error}</Error>
            }
        </div>
    )
}



