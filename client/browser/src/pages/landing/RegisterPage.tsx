import {api} from "../../api/api.ts";
import {Error, LandingButton, LandingInputField} from "./Common.tsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";


export const RegisterPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {mutate, error} = useMutation({
        // queryKey: ["register"],
        mutationFn: () => api.register({email, password}),
        onSuccess: () => navigate("/landing/login")
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
            <LandingButton onClick={() => mutate()}>Register
            </LandingButton>
            {error && <Error>{error.message}</Error>}
        </div>
    )
}
