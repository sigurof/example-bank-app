import styled from "styled-components";
import React from "react";


const Bed = styled.div`
    background-color: #333;
    color: white;
    padding: 1rem;
    margin: 1rem;
    border: 1px solid #666;
    border-radius: 1rem;
    
`

export const Tab = ({title, children}: { title: string, children: React.ReactNode }) => {
    return (
        <Bed>
            <h1>{title}</h1>
            {children}
        </Bed>
    )
}
