import React from "react"
import styled from "styled-components"

const Buttons = ({ children }) => {
    return (
        <ComponentWrapper>
            {children}
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    padding: 1.25rem;
`


export default Buttons