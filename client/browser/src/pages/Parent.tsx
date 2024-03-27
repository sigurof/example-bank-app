import styled from "styled-components";
import {Outlet} from "react-router-dom";


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
    return (
        <Backdrop>
            <LogoBar>
                <BankLogo>Banky Bank</BankLogo>
            </LogoBar>
            <Outlet/>
        </Backdrop>
    )
}
