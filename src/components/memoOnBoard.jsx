import { useEffect } from "react"
import { useRef } from "react"
import styled from "styled-components"

const MemoOnBoard = ({ size, text = "", background = "white", color = "black", children, marginOption }) => {
    const $component = useRef()

    useEffect(() => {
        console.log($component)
    }, [$component])

    return (
        <ComponentWrapper ref={$component} size={size} background={background} color={color} marginOption={marginOption}>
            <MemoText>{text}{children}</MemoText>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.background.includes("http") ? `url(${props.background})` : props.background};
    color: ${props => props.color};
    width: ${props => props.size ? `${props.size}` : `10.5rem`};
    height: ${props => props.size ? `${props.size}` : `10.5rem`};
    border-radius: ${props => props.size ? `${props.size * 0.05}` : `0.25rem`};
    padding: ${props => props.size ? `${props.size * 0.1}px` : `0.875rem`};
    font-size: ${props => props.size ? `${props.size * 0.07}px` : `0.625rem`};
    font-weight: 300;
    line-height: ${props => props.size ? `${props.size * 0.1}px` : `0.9325rem`};
    margin-left: ${props => props.marginOption ? 'auto' : null};
    margin-right: ${props => !props.marginOption ? 'auto' : null};
`

const MemoText = styled.span`
    white-space: pre-wrap;
    word-break: break-all;
    max-width: 100%;
`

export default MemoOnBoard