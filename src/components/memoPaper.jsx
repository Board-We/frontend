import React from 'react'
import styled from 'styled-components'

const MemoPaper = ({ text, background="", color }) => {
    return (
        <ComponentWrapper background={background} color={color}>
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
`

export default MemoPaper