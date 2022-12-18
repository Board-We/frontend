import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Thumb from './thumb';

const ColorSelectBar = ({ color, setColor }) => {
    const $canvas = useRef(null);
    const [sliderWidth, setSliderWidth] = useState()
    const [sliderThumb, setSliderThumb] = useState({ left: 0 })

    useEffect(() => {
        setSliderWidth($canvas.current.clientWidth)
    }, [$canvas.current]);

    useEffect(()=>{
        makeBar()
    }, [sliderWidth])

    const makeBar = () => {
        const canvas = $canvas.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        // 색상 그리기
        const gradient = ctx.createLinearGradient(0, 0, canvas.clientWidth, 0);

        gradient.addColorStop(0, 'rgb(255, 0, 0)');
        gradient.addColorStop(0.17, 'rgb(255, 255, 0)');
        gradient.addColorStop(0.34, 'rgb(0, 255, 0)');
        gradient.addColorStop(0.51, 'rgb(0, 255, 255)');
        gradient.addColorStop(0.68, 'rgb(0, 0, 255)');
        gradient.addColorStop(0.85, 'rgb(255, 0, 255)');
        gradient.addColorStop(1, 'rgb(255, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const handleCanvasClick = (event) => {
        const canvas = $canvas.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const { left, top } = canvas.getBoundingClientRect();
        let x, y
        if (event.targetTouches) {
            x = event.targetTouches[0].clientX - left
            y = event.targetTouches[0].clientY - top
        } else {
            x = event.clientX - left;
            y = event.clientY - top;
        }
        const imageData = ctx.getImageData(x, y, 1, 1).data;
        const [r, g, b] = imageData;

        if (x >= 0 && x <= canvas.clientWidth) {
            setColor(`rgb(${r}, ${g}, ${b})`);
            setSliderThumb({ left: x })
        }
    };

    return (
        <ComponentWrapper>
            <Bar ref={$canvas} width={sliderWidth} onClick={handleCanvasClick} onTouchMove={handleCanvasClick} />
            <Thumb color={color} left={sliderThumb.left} top={"8"} />
        </ComponentWrapper>
    );
}

const ComponentWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

const Bar = styled.canvas`
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
`

export default ColorSelectBar;