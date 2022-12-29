import React from 'react'
import styled from 'styled-components'

const Tag = ({ text, color = "black", size = "medium", children }) => {
    return (
        <ComponentWrapper color={color} size={size}>{text}{children}</ComponentWrapper>
    )
}

const ComponentWrapper = styled.span`
    font-size: ${props => props.size === "large" ? `1.25rem` : props.size === "medium" ? `1.0rem` : `0.875rem`};
    font-weight: 400;
    color: ${props => props.color};
    opacity: 0.8;
`

export default Tag