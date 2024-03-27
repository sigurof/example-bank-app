import styled from "styled-components";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {SessionInvalidEvent} from "../api/api.ts";


const LogoBar = styled.div`
    display: flex;
    background-color: #333;
    color: white;
    justify-content: center;
    padding: 0 10%;
    border: 1px solid #999;
    border-left: none;
    border-right: none;
`

const BankLogo = styled.div`
    grid-column: 1;
    font-size: 3rem;
    text-align: center;
    height: fit-content;
    text-shadow: 0 0 4px #888, 0 0 4px #888;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
`

const Backdrop = styled.div`
    background-color: #444;
    color: white;
    min-height: 100vh;
`


export const Parent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleSessionInvalid = (event: SessionInvalidEvent) => {
            console.log('Session Invalid. Logging out.')
            navigate(event.detail); // Navigate to the path provided in the event
        };

        window.addEventListener('sessionInvalid', handleSessionInvalid as EventListener);
        return () => {
            window.removeEventListener('sessionInvalid', handleSessionInvalid as EventListener);
        };
    }, [navigate]);
    return (
        <Backdrop>
            <LogoBar>
                <BankLogo>Banky Bank</BankLogo>
            </LogoBar>
            <Outlet/>
        </Backdrop>
    )
}
