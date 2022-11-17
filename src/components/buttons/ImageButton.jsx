import React from 'react'
import styled from 'styled-components'

const ImageButton = ({ imageUrl, text = "", textPosition = "bottom", size = "medium", color = "black", backgroundColor = "white", selected = false, round = true, onClick }) => {
    return (
        <ComponentWrapper background={backgroundColor} textPosition={textPosition} color={color} selected={selected} round={round} onClick={onClick}>
            {
                textPosition === "left" || textPosition === "top" ? <ContentText>{text}</ContentText> : null
            }
            <ContentImage src={imageUrl} />
            {
                textPosition === "right" || textPosition === "bottom" ? <ContentText>{text}</ContentText> : null
            }
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display: flex;
    flex-direction: ${props => (props.textPosition === "left" || props.textPosition === "right") ? `row` : `column`};
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 5rem;
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: ${props => props.round ? '0.5rem' : '0'};
    color: ${props => props.color};
    background: ${props => props.background};
    filter: ${props => props.selected ? `brightness(85%)` : null};
`

const ContentImage = styled.img`
    width: ${props => props.text !== "" ? `1.5rem` : `100%`};
    height: ${props => props.text !== "" ? `1.5rem` : `100%`};
`

const ContentText = styled.span`
    font-size: 0.75rem;
    margin-top: 0.5rem;
`

export default ImageButton