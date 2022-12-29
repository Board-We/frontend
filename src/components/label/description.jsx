import React, { forwardRef } from 'react'
import styled from 'styled-components'

const Description = forwardRef(({ text, color = "black", size = "medium", children, style }, ref) => (
    <ComponentWrapper ref={ref} id="descib" style={style} color={color} size={size}>{text}{children}</ComponentWrapper>
))

const ComponentWrapper = styled.span`
    font-size: ${props => props.size === "large" ? `1.25rem` : props.size === "medium" ? `1.0rem` : `0.875rem`};
    font-weight: 400;
    color: ${props => props.color};
    opacity: 0.4;
    word-break: break-word;
    line-height: 1rem;
    height: 2rem;
`

export default Description