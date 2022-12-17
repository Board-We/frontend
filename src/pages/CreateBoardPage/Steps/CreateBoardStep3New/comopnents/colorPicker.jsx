import { useRef, useState } from "react"
import styled from "styled-components"

const ColorPicker = () => {

    const [selectedColor, setSelectedColor] = useState("#FF0000")
    const [paletteThumb, setPaletteThumb] = useState({ left: 0, bottom: 0 })
    const [sliderThumb, setSliderThumb] = useState({ left: 0 })
    const $slider = useRef()

    const onInputSlider = (e) => {
        let left = 0

        if (e.clientX) {
            // onClick
            left = e.clientX
        } else {
            // onTouch
            if (e.targetTouches[0]) left = e.targetTouches[0].clientX
        }

        setSliderThumb({ ...sliderThumb, left: left })
    }

    return (
        <ComponentWrapper>
            <ColorPalette><Thumb color={selectedColor} /></ColorPalette>
            <Slider ref={$slider} onTouchStart={onInputSlider} onClick={onInputSlider} onTouchMove={onInputSlider}>
                <Thumb color={selectedColor} left={sliderThumb.left} />
            </Slider>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    width: inherit;
`

const ColorPalette = styled.div`
    width:100%;
    height: 20vh;
    min-height: 100px;
    max-height: 250px;
    margin: 1rem;
`

const Slider = styled.div`
    position: relative;
    width:100%;
    height: 1.5rem;
    background: linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%);
    border-radius: 1rem;    
`

const Thumb = styled.div`
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    border: 0.2rem solid white;
    border-radius: 100%;
    background: ${props => props.color};
    transform: translate(-50%, -0.5rem);
    user-select: none;
    left: ${props => props.left}px;
    bottom: ${props => props.bottom}px;
`

export default ColorPicker