import React from 'react'
import styled from 'styled-components'

const ChipButton = ({ color, fontColor, round, flat, text, onClick }) => {
    return (
        <ComponentWrapper
            color={color}
            fontColor={fontColor}
            round={round}
            flat={flat}
            onClick={onClick}
        >
            {text}
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 3rem;
    width: fit-content;
    height: 1.25rem;
    font-size: 1rem;
    color: ${props => props.fontColor ? props.fontColor : 'white'};
    border-radius: ${props => props.round || props.round === undefined ? `1.25rem` : '0'};
    background-color: ${props => props.color ? props.color : 'grey'};
    box-shadow: ${props => props.flat ? '' : '2px 2px 8px red'};
    user-select: none;
    :hover {
        transform: translate(-2px, -2px)
    }
`

export default ChipButton