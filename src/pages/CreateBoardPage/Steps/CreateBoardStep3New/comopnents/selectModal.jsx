import { useState } from "react"
import styled from "styled-components"
import ColorPalette from "./colorPalette"
import ColorSelectBar from "./colorSelectBar"

const SelectModal = ({ open, onClose, children }) => {

    const [color, setColor] = useState('#fff')
    const [baseColor, setBaseColor] = useState('rgb(255, 0, 0)')

    return (
        <ComponentWrapper open={open}>
            {children}
            <ColorPaletteContainer>
                <ColorPalette color={color} setColor={setColor} baseColor={baseColor} />
            </ColorPaletteContainer>
            <ColorSelectBarContainer>
                <ColorSelectBar color={baseColor} setColor={setBaseColor} />
            </ColorSelectBarContainer>
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
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    background: #ffffff00;
    background: #DCDCDC;
    visibility: ${props => props.open ? `visible` : `hidden`};
    z-index: 3;
`

const ColorPaletteContainer = styled.div`
    width: 100%;
    min-height: 7rem;
    height: 100%;
    padding: 0.75rem;
`

const ColorSelectBarContainer = styled.div`
    width: 100%;
    height: 2.5rem;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default SelectModal