import styled from "styled-components"
import ColorPicker from "./colorPicker"

const SelectModal = ({ open, onClose, children }) => {

    return (
        <ComponentWrapper open={open}>
            {children}
            <ColorPicker />
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    position:absolute;
    left:0;
    bottom: 0;
    min-height: 40vh;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background: #ffffff00;
    background: #DCDCDC;
    visibility: ${props => props.open ? `visible` : `hidden`};
    z-index: 3;
`

export default SelectModal