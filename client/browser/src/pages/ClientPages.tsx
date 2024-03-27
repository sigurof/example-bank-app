import {credentialsAtom} from "../state.ts";
import {useAtom} from "jotai";
import {Outlet, useNavigate} from "react-router-dom";

import {useEffect} from "react";
import styled from "styled-components";
import {paths} from "../main.tsx";

const AppBar = styled.div`
    display: grid;
    background-color: #333;
    color: white;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    align-items: center;
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

const UserMenuBed = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;

    grid-column: 3;
    font-size: 1.5rem;
    text-align: center;
`

const LogOutButton = styled.button`
    background-color: #444;
    color: white;
    border: none;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin-left: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #333;
    }
`

const UserMenu = ({username, onLogOut}: { onLogOut: () => void, username: string }) => {
    return (
        <UserMenuBed>
            <div>{username}</div>
            <LogOutButton onClick={() => {
                onLogOut()
            }}>Log out</LogOutButton>
        </UserMenuBed>
    )
}

const PaddedSpace = styled.div`
    padding: 0 10%;
`

const NavigationBed = styled.div`
    //display: flex;
    //flex-flow: row nowrap;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: 100%;
    align-items: center;
    justify-content: flex-start;

    grid-column: 2;
    font-size: 1.5rem;
    text-align: center;
`

const NavigationButton = styled.button`
    background-color: #333;
    color: white;
    border: none;
    width: auto;
    font-size: 1rem;
    height: 100%;
    padding: 0.5rem 1rem;
    cursor: pointer;

    &:hover {
        background-color: #333;
    }
`

const Backdrop = styled.div`
    background-color: #444;
    color: white;
    min-height: 100vh;
`

const NavigationMenu = () => {
    const navigate = useNavigate()
    return (
        <NavigationBed>
            <NavigationButton onClick={() => navigate(paths.ACCOUNTS)}>Accounts</NavigationButton>
            <NavigationButton onClick={() => navigate(paths.TRANSFER)}>Transfer</NavigationButton>
            <NavigationButton onClick={() => navigate(paths.LOANS)}>Loans</NavigationButton>
        </NavigationBed>
    )
}




export const ClientPages = () => {
    const [credentials, setCredentials] = useAtom(credentialsAtom)
    const username = credentials.username
    const navigate = useNavigate()
    console.log(credentials)
    useEffect(() => {
        if (!username) navigate("/landing/login")
    }, [username]);
    return (
        <Backdrop>
            <AppBar>
                <BankLogo>Banky Bank</BankLogo>
                <NavigationMenu/>
                <UserMenu username={username} onLogOut={() => {
                    setCredentials({username: "", password: ""})
                    navigate("/landing/login")
                }}/>
            </AppBar>
            <PaddedSpace>
                <Outlet/>
            </PaddedSpace>
        </Backdrop>
    )
}
