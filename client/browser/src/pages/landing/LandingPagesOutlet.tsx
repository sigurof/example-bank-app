import {Outlet, useLocation, useNavigate} from "react-router-dom";
import styled from "styled-components";

const LandingBed = styled.div`


`
const PaddedSpace = styled.div`
    padding: 0 25%;
`

const TabsBed = styled.div`
    background-color: #333;
    color: white;
    margin: 1rem;
    border: 1px solid #666;
`

const TabButtonsBed = styled.div`
    display: flex;
    justify-content: space-around;

    button {
        
        &.active {
            background-color: #999;
            
            &:hover {
                background-color: #999;
            }
        }
        
        width: 100%;
        background-color: #444;
        color: white;
        border: none;
        padding: 1rem;

        cursor: pointer;
        transition: 0.2s;

        &:hover {
            background-color: #333;
        }
    }
`

const Padded = styled.div`
    padding: 0 10%;
`

const Tabs = ({options}: {
    options: {
        route: string,
        title: string,
    }[], title?: string, children?: React.ReactNode
}) => {
    const navigate = useNavigate()
    const location = useLocation().pathname

    return (
        <TabsBed>
            <TabButtonsBed>
                {options.map((option, index) => (
                    <button className={
                        location === option.route ? "active" : ""
                    } key={index} onClick={() => navigate(option.route)}>{option.title}</button>
                ))}
            </TabButtonsBed>
            <Padded>
                <Outlet/>
            </Padded>
        </TabsBed>
    )
}

export const LandingPagesOutlet = () => {
    return (
        <LandingBed>
            <PaddedSpace>
                <Tabs options={[{
                    route: "/landing/login",
                    title: "Login",
                }, {
                    route: "/landing/register",
                    title: "Register",
                }]}/>
            </PaddedSpace>
        </LandingBed>
    )
}
