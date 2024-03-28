import {Tab} from "../Commons.tsx";
import styled from "styled-components";
import {Account as AccountType, api} from "../../../api/api.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {InputField} from "../../../components/Input.tsx";
import {ChangeEvent, useState} from "react";


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

const Account = ({account}: { account: AccountType }) => {
    return (
        <AccountBed>
            <h2>{account.name}</h2>
            <p>{account.type}</p>
            <p>{Math.abs(account.balance)}</p>
        </AccountBed>
    )
}

const StyledButton = styled.button`
    width: 100%;
    height: 3rem;
    align-self: end;
    padding: 0.5rem;
    // dark purple theme. Accents are light purple
    background-color: #0e0e2b;
    color: white;
    border: 1px solid #666;
    border-radius: 0.5rem;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: #7957eb;
    }

    &:hover {
        border-color: #7957eb;
    }

    &:active {
        background-color: #7957eb;
    }

    transition: background-color 0.3s;
`

const AccountsList = () => {
    const {data: accounts, error} = useQuery({
        queryKey: ["accounts"],
        queryFn: () => api.getAccounts()
    })
    return (
        <Tab title={"Accounts"}>
            {accounts?.map((acc, index) => {
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

const CreateAccount = () => {
    const [name, setName] = useState("")
    // react query to post new account
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationKey: ["accounts"],
        mutationFn: () => api.createAccount({name}),
        onSuccess: () => queryClient.invalidateQueries({
            queryKey: ["accounts"]
        })
    })

    return (
        <Tab title={"Create Account"}>
            <InputField onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value)
            }} name={"Account Name"}/>
            <StyledButton onClick={() => name && mutate()}>Submit</StyledButton>
        </Tab>
    )
}

export const Accounts = () => {
    return (
        <div>
            <AccountsList/>
            <CreateAccount/>
        </div>


    )
}
