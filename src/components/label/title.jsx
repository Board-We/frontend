import React from 'react'
import { forwardRef } from 'react'
import styled from 'styled-components'

const Title = forwardRef(({ text, color = "black", children }, ref) => (
    <ComponentWrapper ref={ref} color={color}>{text}{children}</ComponentWrapper>
))

const ComponentWrapper = styled.span`
    font-size: 1.75rem;
    font-weight: 500;
    color: ${props => props.color};
`

export default Title