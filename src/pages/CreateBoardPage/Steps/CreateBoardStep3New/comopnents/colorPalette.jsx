import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Thumb from './thumb';

const ColorPalette = ({ option, color, setColor, baseColor, board, setBoard }) => {
    const $canvas = useRef(null);
    const [sliderWidth, setSliderWidth] = useState()
    const [sliderThumb, setSliderThumb] = useState({ left: 10, top: 10 })


    useEffect(() => {
        setSliderWidth($canvas.current.clientWidth)
    }, [$canvas.current]);

    useEffect(()=>{
        makePalette()
    }, [sliderWidth])

    useEffect(() => {
        makePalette()
    }, [baseColor])

    const makePalette = () => {
        const canvas = $canvas.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        // 색상 그리기
        ctx.fillStyle = baseColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 채도 그리기
        const grdWhite = ctx.createLinearGradient(0, 0, canvas.width, 0);
        grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
        grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grdWhite;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        var grdBlack = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
        grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
        ctx.fillStyle = grdBlack;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const { left, top } = canvas.getBoundingClientRect();
        handleCanvasClick({ clientX: left + sliderThumb.left, clientY: top + sliderThumb.top })
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

        if (x < 0 || x > canvas.clientWidth || y < 0 || y > canvas.clientHeight) return

        const imageData = ctx.getImageData(x, y, 1, 1).data;
        const [r, g, b] = imageData;

        setColor(`rgb(${r}, ${g}, ${b})`);
        setSliderThumb({ left: x, top: y })
        changeBoardColorOption()
    };

    const changeBoardColorOption = () => {
        if (option[0] === "배경") {
            if (option[1] === "bgColor") setBoard({ ...board, background: color })
        }
        else if (option[0] === "메모지") {
            const newMemoThemes = [...board.memoThemes]
            const newMemoTheme = { ...newMemoThemes[option[2]] }

            if (option[1] === "bgColor") newMemoTheme.memoBackground = color
            else if (option[1] === "fontColor") newMemoTheme.memoTextColor = color

            newMemoThemes[option[2]] = newMemoTheme
            setBoard({ ...board, memoThemes: newMemoThemes })
        }
    }

    return (
        <ComponentWrapper>
            <Palette ref={$canvas} width={sliderWidth} onClick={handleCanvasClick} onTouchMove={handleCanvasClick} />
            <Thumb color={color} left={sliderThumb.left} top={sliderThumb.top} />
        </ComponentWrapper>
    );
}

const ComponentWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

const Palette = styled.canvas`
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
`

export default ColorPalette;