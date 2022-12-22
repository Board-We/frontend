import React, { useCallback, useMemo, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import {
    clamp,
    getHueCoordinates,
    getSaturationCoordinates,
    hsvToRgb,
    parseColor,
    rgbToHex
} from "../../../../../utils/colorTool";
import Thumb from "./thumb";

const ColorPicker = ({ color, onChange }) => {
    const parsedColor = useMemo(() => parseColor(color), [color]);
    const satCoords = useMemo(() => getSaturationCoordinates(parsedColor),
        [parsedColor])
    const hueCoords = useMemo(() => getHueCoordinates(parsedColor),
        [parsedColor])
    const $bar = useRef()

    const onSaturationChange = useCallback((e) => {
        const { width, height, left, top } = e.target.getBoundingClientRect()
        const eventX = e.targetTouches ? e.targetTouches[0].clientX - left : e.clientX - left
        const eventY = e.targetTouches ? e.targetTouches[0].clientY - top : e.clientY - top

        if (eventX < 0 || eventX > width || eventY < 0 || eventY > height) return

        const x = clamp(eventX, 0, width)
        const y = clamp(eventY, 0, height)

        const s = (x / width) * 100
        const v = 100 - (y / height) * 100

        const rgb = hsvToRgb({ h: parsedColor?.hsv.h, s, v })
        onChange(rgbToHex(rgb))
    }, [parsedColor, onChange])

    const onHueChange = useCallback((e) => {
        const { width, left } = e.target.getBoundingClientRect()
        const eventX = e.targetTouches ? e.targetTouches[0].clientX : e.clientX
        const x = clamp(eventX - left, 0, width)
        const h = Math.round((x / width) * 360)

        const hsv = { h, s: parsedColor?.hsv.s, v: parsedColor?.hsv.v }
        const rgb = hsvToRgb(hsv)
        onChange(rgbToHex(rgb))
    }, [parsedColor, onChange])

    return (
        <ComponentWrapper>
            <ColorPaletteContainer>
                <ColorPalette
                    backgroundColor={`hsl(${parsedColor.hsv.h}, 100%, 50%)`}
                    onClick={onSaturationChange}
                    onTouchMove={onSaturationChange}
                    onMouseMove={onSaturationChange}
                />
                <Thumb
                    color={parsedColor.hex}
                    left={(satCoords?.[0] ?? 0) + "%"}
                    top={(satCoords?.[1] ?? 0) + "%"}
                />
            </ColorPaletteContainer>
            <ColorBarContainer>
                <ColorBar
                    ref={$bar}
                    onClick={onHueChange}
                    onTouchMove={onHueChange}
                />
                <Thumb
                    color={parsedColor.hex}
                    left={(hueCoords ?? 0) + "%"}
                    top={($bar.current?.clientHeight ?? 0) / 2 + 'px'}
                />
            </ColorBarContainer>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
    width: 100%;
    gap: 1rem;
`

const ColorPaletteContainer = styled.div`
    position: relative;
`

const ColorPalette = styled.div`
    width: 100%;
    min-height: 10rem;
    background-image: linear-gradient(transparent, black), linear-gradient(to right, white, transparent);
    border-radius: 0.5rem;
    background-color: ${props => props.backgroundColor};
`

const ColorBarContainer = styled.div`
    position: relative;
`

const ColorBar = styled.div`
    width: 100%;
    height: 1rem;
    background-image: linear-gradient(
      to right,
      #ff0000,
      #ffff00,
      #00ff00,
      #00ffff,
      #0000ff,
      #ff00ff,
      #ff0000
    );
    border-radius: 1rem;
`

export default ColorPicker