import React from 'react'
import styled from 'styled-components'

const MemoType = ({ background, isSelected }) => {
    return (
        <ComponentWrapper background={background} isSelected={isSelected}>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    width: 5rem;
    height: 5rem;
    border: ${props => props.isSelected ? `1px solid black` : '0px'};
    background: ${props => props.background.includes("http") ? `url(${props.background})` : props.background}
`

export default MemoType