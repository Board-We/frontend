import styled from "styled-components"

const Spinner = ({ position = "center", color = "#2094FA", speed = 500, size = "medium", text = "" }) => {
    return (
        <ComponentWrapper position={position} color={color} speed={speed} size={size}>
            {text}
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    position: fixed;
    top: 50%;
    width: ${props => props.size === "large" ? "6rem" : props.size === "small" ? "2.5rem" : "4rem"};
    height: ${props => props.size === "large" ? "6rem" : props.size === "small" ? "2.5rem" : "4rem"};
    z-index: 4;
    opacity: 0.7;
    border-radius: 100%;
    border: ${props => props.size === "large" ? "1.25rem" : props.size === "small" ? "0.5rem" : "0.75rem"} dotted transparent;
    border-color: ${props => props.color};
    animation: spinner 2.0s ease infinite;
    @keyframes spinner {
        from {transform: rotate(0deg); }
        to {transform: rotate(360deg);}
    }
`

export default Spinner