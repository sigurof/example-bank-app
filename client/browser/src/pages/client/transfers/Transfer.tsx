import {Tab} from "../Commons.tsx";
import styled from "styled-components";
import {accounts} from "../../../api/api.ts";
import {InputField, SelectField} from "../../../components/Input.tsx";



const TransferButton = styled.button`
    height: 3rem;
    align-self:end;
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


const FormBed = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 1rem;
    margin: 1rem 0;
`


export const Transfer = () => {
    return (
        <Tab title={"Transfer"}>
            <FormBed>
                <SelectField options={accounts.map(account => ({
                    id: account.id,
                    label: account.name
                }))} name={"From account"}/>
                <InputField name={"Receiver's account"}/>
                <InputField name={"Transfer amount"}/>
                <TransferButton>Transfer</TransferButton>
            </FormBed>
        </Tab>
    )
}
