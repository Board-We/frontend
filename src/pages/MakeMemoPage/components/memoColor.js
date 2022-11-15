import React from 'react'
import styled from 'styled-components'

const MemoColor = ({ background, isSelected, onClick }) => {
    return (
        <ComponentWrapper background={background} isSelected={isSelected} onClick={onClick}>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    border: ${props => props.isSelected ? `1px solid black` : null};
    background: ${props => props.background};
    background-size: contain;
    background-position: center;
    margin: 0.25rem;
`

export default MemoColor