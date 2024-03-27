import {api} from "../../api/api.ts";
import {Error, LandingButton, LandingInputField} from "./Common.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


export const RegisterPage = () => {
    // const [_, setCredentials] = useAtom(credentialsAtom)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const register = async () => {
        await api.register(username, password);
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
            <LandingButton onClick={() => register()
                .then(_ => {
                    navigate("/landing/login")
                }).catch(err => {
                    setError(err)
                })
            }>Register
            </LandingButton>
            {error && <Error>{error}</Error>}


        </div>
    )
}
