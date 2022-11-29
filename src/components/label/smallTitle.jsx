import React from 'react'
import styled from 'styled-components'

const SmallTitle = ({ text, color = "black", children }) => {
    return (
        <ComponentWrapper color={color}>{text}{children}</ComponentWrapper>
    )
}

const ComponentWrapper = styled.span`
    font-size: 1.25rem;
    font-weight: 600;
    color: ${props => props.color};
`

export default SmallTitle