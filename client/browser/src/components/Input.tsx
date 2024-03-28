import styled from "styled-components"
import {DetailedHTMLProps, HTMLAttributes} from "react";


const InputBed = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;

    label {
        margin-bottom: 0.5rem;
    }

    input {
        height: 3rem;
        padding: 0.5rem;
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
        height: 3rem;
        padding: 0 0.5rem;
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

export const InputField = ({name, ...rest}: {
    name: string
} & DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    return (
        <InputBed {...rest}>
            <label htmlFor={name}>{name}</label>
            <input id={name} name={name}/>
        </InputBed>
    )
}

export const SelectField = ({options, name}: { options: { id: string, label: string }[], name: string }) => {
    return (
        <InputBed>
            <label htmlFor={name}>{name}</label>
            <select id={name} name={name}>
                {options.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}
            </select>
        </InputBed>
    )
}
