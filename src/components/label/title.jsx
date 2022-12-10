import React from 'react'
import styled from 'styled-components'

const Title = ({ text, color = "black", children }) => {
    return (
        <ComponentWrapper color={color}>{text}{children}</ComponentWrapper>
    )
}

const ComponentWrapper = styled.span`
    font-size: 1.75rem;
    font-weight: 500;
    color: ${props => props.color};
`

export default Title