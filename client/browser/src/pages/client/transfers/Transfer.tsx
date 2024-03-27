import {Tab} from "../Commons.tsx";
import styled from "styled-components";
import {accounts} from "../../../api/api.ts";


const InputBed = styled.div`
    // dark purple theme. Accents are light purple
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0;

    label {
        margin-bottom: 0.5rem;
    }

    input {
        padding: 0.5rem;
        // dark purple theme. Accents are light purple
        background-color: #0e0e2b;

        color: white;
        border: 1px solid #666;
        border-radius: 0.5rem;

        &:focus {
            outline: none;
            border-color: #7957eb;
        }

        &:hover {
            border-color: #7957eb;
        }

    }

    select {
        padding: 0.5rem;
        // dark purple theme. Accents are light purple
        background-color: #0e0e2b;
        color: white;
        border: 1px solid #666;
        border-radius: 0.5rem;

        &:focus {
            outline: none;
            border-color: #7957eb;
        }

        &:hover {
            border-color: #7957eb;
        }
    }
`

const TransferButton = styled.button`
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

const InputField = ({name}: { name: string }) => {
    return (
        <InputBed>
            <label htmlFor={name}>{name}</label>
            <input id={name} name={name}/>
        </InputBed>
    )
}

const FormBed = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 1rem;
    margin: 1rem 0;
`

const SelectField = ({options, name}: { options: { id: string, label: string }[], name: string }) => {
    return (
        <InputBed>
            <label htmlFor={name}>{name}</label>
            <select id={name} name={name}>
                {options.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}
            </select>
        </InputBed>
    )
}

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
