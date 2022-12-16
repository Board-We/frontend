import styled from "styled-components"

const Toast = ({ icon, text = "", open, onClick, position = "bottom", background = "rgba(28, 27, 31, 0.5)", color = "white", children }) => {
    return (
        <ComponentWrapper open={open} onClick={onClick} position={position} background={background} color={color}>
            {icon}{text}{children}
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    position: fixed;
    text-align: center;
    width: max-content;
    padding: 0.5rem 1.5rem;
    border-radius: 100px;
    font-size: 0.875rem;
    font-weight: 400;
    visibility: ${props => props.open ? 'visible' : 'hidden'};
    top: ${props => props.position === "top" ? `2rem` : props.position === "bottom" ? null : `50%`};
    bottom: ${props => props.position === "bottom" ? `2rem` : null};
    left: ${props => props.position === "left" ? `2rem` : props.position === "right" ? null : `50%`};
    right: ${props => props.position === "right" ? `2rem` : null};
    transform: ${props => props.position === "top" ? `translate(-50%, 0)` : props.position === "bottom" ? `translate(-50%, 0)` : props.position === "left" ? `translate(0, -50%)` : props.position === "right" ? `translate(0, -50%)` : null};
    background: ${props => props.background};
    color: ${props => props.color};
`

export default Toast