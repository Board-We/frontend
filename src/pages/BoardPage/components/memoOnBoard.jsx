import styled from "styled-components"

const MemoOnBoard = ({ text = "", background = "white", color = "black", children, marginOption }) => {
    return (
        <ComponentWrapper background={background} color={color} marginOption={marginOption}>
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
    width: 10.5rem;
    height: 10.5rem;
    border-radius: 0.25rem;
    padding: 0.875rem;
    font-size: 0.875rem;
    font-weight: 500;
    margin-left: ${props => props.marginOption ? 'auto' : null};
    margin-right: ${props => !props.marginOption ? 'auto' : null};
`

const MemoText = styled.span`
    white-space: pre-wrap;
    word-break: break-all;
    max-width: 100%;
`

export default MemoOnBoard