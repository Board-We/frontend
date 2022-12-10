import React from 'react'
import styled from 'styled-components'

const Subtitle = ({ text, color = "black", style, children}) => {
    return (
        <ComponentWrapper styled={style} color={color}>{text}{children}</ComponentWrapper>
    )
}

const ComponentWrapper = styled.span`
    font-size: 1.5rem;
    font-weight: 600;
    color: ${props => props.color};
`

export default Subtitle