import React from 'react'
import styled from 'styled-components'

const MemoPaper = ({ text, background="", color, isSelected }) => {
    return (
        <ComponentWrapper background={background} color={color} isSelected={isSelected}>
            {text}
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    background: ${props => props.background.includes("http") ? `url(${props.background})` : props.background};
    color: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 6rem;
    height: 6rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    border: ${props => props.isSelected ? `0.2rem solid black` : `0.5px solid #969696`};
`

export default MemoPaper