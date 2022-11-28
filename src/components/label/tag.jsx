import React from 'react'
import styled from 'styled-components'

const Tag = ({ text, color = "black" }) => {
    return (
        <ComponentWrapper color={color}>{text}</ComponentWrapper>
    )
}

const ComponentWrapper = styled.span`
    font-size: 1.2rem;
    font-weight: 400;
    color: ${props => props.color};
    opacity: 0.8;
`

export default Tag