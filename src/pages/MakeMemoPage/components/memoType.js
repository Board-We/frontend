import React from 'react'
import styled from 'styled-components'

const MemoType = ({ background, isSelected, onClick }) => {

    return (
        <ComponentWrapper background={background} isSelected={isSelected} onClick={onClick}>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    width: 5rem;
    height: 5rem;
    border: ${props => props.isSelected ? `1px solid black` : null};
    background: ${props => `url(${props.background})`};
    background-size: contain;
    background-position: center;
    margin: 0.25rem;
`

export default MemoType