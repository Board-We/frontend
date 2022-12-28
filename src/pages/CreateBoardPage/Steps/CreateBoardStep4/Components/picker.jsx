import { useEffect, useRef } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { deviceScreenState } from "../../../../../store";
import { theme } from "../../../../../styles/theme";

const Picker = ({ data, selectedData, setSelectedData }) => {
    const [index, setIndex] = useState(0)
    const deviceScreen = useRecoilValue(deviceScreenState)
    const eventTimer = useRef()
    const $scroll = useRef()
    const timer = useRef()

    useEffect(() => {
        setIndex(data.indexOf(selectedData))
    }, [selectedData])

    useEffect(() => {
    }, [eventTimer.current])

    const onClickData = (el) => {
        setSelectedData(el)
    }

    const initEventTimer = () => {
        eventTimer.current = 500
    }

    const onScrollData = (e) => {
        initEventTimer()
        const heightOfEntity = Number(deviceScreen.rem.replace("px", "")) * 2.5
        const newIndex = Math.round(e.target.scrollTop / heightOfEntity)
        detectOnScrollEnd()
        setSelectedData(data[newIndex])
    }

    const detectOnScrollEnd = () => {
        if (timer.current !== null) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(function () {
            $scroll.current.scrollTop = data.indexOf(selectedData) * Number(deviceScreen.rem.replace("px", "")) * 2.5
        }, 100);
    }

    return (
        <ComponentWrapper>
            <Bar top={"1.875rem"} />
            <ScrollWrapper ref={$scroll} onScroll={onScrollData} >
                <Entity>&nbsp;</Entity>
                {
                    data.map((el) => {
                        return (
                            <Entity onClick={() => onClickData(el)} isSelected={el === selectedData} isSingle={data.length === 1} key={el}>{el}</Entity>
                        )
                    })
                }
                <Entity>&nbsp;</Entity>
            </ScrollWrapper>
            <Bar bottom={"1.875rem"} />
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    position: relative;
`

const ScrollWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 7.5rem;
    overflow: scroll;
    scroll-behavior: smooth;
    &::-webkit-scrollbar{
        display: none;
    }
`

const Entity = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.isSelected ? theme.colors.black : theme.colors.grey_30};
    height: 2.5rem;
    min-width: 3.625rem;
    font-size: 1.25rem;
    font-weight: 400;
    margin: 0 0.5rem;
    padding: 0.5rem 0;
`

const Bar = styled.hr`
    position: absolute;
    width: 3.625rem;
    height: 2px;
    border: 0;
    color: ${theme.colors.black};
    background: ${theme.colors.black};
    top: ${props => props.top};
    bottom: ${props => props.bottom};
    left: 50%;
    transform: translateX(-50%);
`

export default Picker