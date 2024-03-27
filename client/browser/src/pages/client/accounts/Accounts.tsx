import {Tab} from "../Commons.tsx";
import styled from "styled-components";
import {Account as AccountType, accounts, api} from "../../../api/api.ts";
import {useQuery} from "@tanstack/react-query";


const AccountBed = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    border: 1px solid #999;
    border-left: none;
    border-right: none;
    margin: 0.5rem 0;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #444;
    color: white;
    box-shadow: 0 0 2px #888, 0 0 2px #888;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background-color: #333;
    }

    h2 {
        grid-column: 1;
        grid-row: 1;
        font-size: 1.2rem;
    }
`

const Account = ({account}: {account: AccountType})=>{
    return (
        <AccountBed>
            <h2>{account.name}</h2>
            <p>{account.type}</p>
            <p>{Math.abs(account.balance)}</p>
        </AccountBed>
    )
}

export const Accounts = ()=>{
    const {data, error} = useQuery({
        queryKey: ["accounts"],
        queryFn: ()=>api.accounts()
    })
    return (
        <Tab title={"Accounts"}>
            {accounts.map((acc, index) => {
                return (
                    <div key={`account-${index}`}>
                        <Account account={acc}/>
                    </div>
                )
            })}
            {
                error && <div>{error.message}</div>
            }
        </Tab>

    )
}
