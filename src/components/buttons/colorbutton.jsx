import React from 'react'
import styled from 'styled-components'

const ColorButton = ({ background = "white", color, text = "", round = true, onClick, selected }) => {
    return (
        <ComponentWrapper onClick={onClick} selected={selected} background={background}>
            <ColorLense color={color} round={round} selected={selected} />
            <span>{text}</span>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    height: fit-content;
    padding: 0.5rem;
    /* filter: ${props => props.selected ? `brightness(85%)` : null};
    background: ${props => props.background};
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem; */
`

const ColorLense = styled.div`
    background-color: ${props => props.color};
    width: 3rem;
    height: 3rem;
    border: ${props => props.selected ? `2px solid black` : "1px solid #00000086"};
    border-radius: ${props => props.round ? '100%' : '0'};
    filter: ${props => props.selected ? `brightness(118%)` : null};
`

export default ColorButton