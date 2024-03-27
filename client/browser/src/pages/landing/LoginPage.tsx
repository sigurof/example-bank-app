import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAtom} from "jotai";
import {api} from "../../api/api.ts";
import {credentialsAtom} from "../../state.ts";
import {Error, LandingButton, LandingInputField} from "./Common.tsx";
import {useMutation} from "@tanstack/react-query";


export const LoginPage = () => {
    const [_, setCredentials] = useAtom(credentialsAtom)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {error, mutate} = useMutation({
        mutationFn: () => api.login({email, password}),
        onSuccess: () => {
            navigate("/client")
            setCredentials({email, password})
        }
    })
    return (
        <div>
            <LandingInputField
                placeholder={"Email"}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}/>
            <LandingInputField
                placeholder={"password"}
                type="Password"
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />
            <LandingButton onClick={() => mutate()}>Log in
            </LandingButton>
            {error && <Error>{error.message}</Error>}
        </div>
    )
}



