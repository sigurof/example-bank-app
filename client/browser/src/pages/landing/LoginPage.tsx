import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAtom} from "jotai";
import {api} from "../../api/api.ts";
import {credentialsAtom} from "../../state.ts";
import {Error, LandingButton, LandingInputField} from "./Common.tsx";


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
        <div>
            <LandingInputField
                placeholder={"Username"}
                onChange={(e) => {
                    setUsername(e.target.value)
                }}/>
            <LandingInputField
                placeholder={"password"}
                type="Password"
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />
            <LandingButton onClick={() => login()
                .then(_ => {
                    navigate("/client")
                }).catch(err => {
                    setError(err)
                })
            }>Log in
            </LandingButton>
            {error && <Error>{error}</Error>}
        </div>
    )
}



