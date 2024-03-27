import styled from "styled-components";

export const LandingInputField = styled.input`
    color: white;
    background-color: #0e0e2b;
    width: 100%;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: 1px solid #666;
    margin: 2rem 0 0 0;
    border-radius: 0.5rem;
    transition: 0.2s;

    &:focus {
        outline: none;
        border-color: #7957eb;
    }

    &:hover {
        border-color: #7957eb;
    }
`

export const LandingButton = styled.button`
    width: 100%;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: 1px solid #666;
    margin: 2rem 0;
    border-radius: 0.5rem;
    background-color: #444;
    color: white;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background-color: #333;
    }
`

export const Error = styled.div`
    color: red;
`
