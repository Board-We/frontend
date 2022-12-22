import styled from "styled-components";

const Thumb = ({ size = "1.5rem", color, left, top }) => {
    return (
        <ComponentWrapper size={size} color={color} left={left} top={top} />
    )
}


const ComponentWrapper = styled.div`
    position: absolute;
    width: ${props => props.size};
    height: ${props => props.size};
    border: 0.2rem solid white;
    border-radius: 100%;
    background: ${props => props.color};
    transform: translate(-50%, -50%);
    user-select: none;
    left: ${props => props.left};
    top: ${props => props.top};
    user-select: none;
`

export default Thumb