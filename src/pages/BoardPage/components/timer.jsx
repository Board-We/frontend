import React, { useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"
import styled from "styled-components"

const Timer = ({ duedate, onTimeOver, text = "" }) => {

    const [timeRemain, setTimeRemain] = useState(0)
    const [date, setDate] = useState(0)
    const [hour, setHour] = useState(0)
    const [min, setMin] = useState(0)
    const [sec, setSec] = useState(0)
    const s = 60
    const m = 60
    const h = 24
    const interval = useRef()

    useEffect(() => {
        if (duedate) {
            const newTimeRemain = duedate.getTime() - (new Date()).getTime()
            setTimeRemain(newTimeRemain)
        }

        if (interval.current) clearInterval(interval.current)

        interval.current = setInterval(() => {
            timeCount()
        }, 1000)
    }, [duedate])

    useEffect(() => {
        refreshTimePannel(timeRemain)
        if (timeRemain < 1) {
            clearInterval(interval.current)
            timeOver()
        }
    }, [timeRemain])

    const refreshTimePannel = (newTime) => {
        const newDate = Math.floor(newTime / s / m / h)
        const newHour = Math.floor(newTime / s / m % h)
        const newMin = Math.floor(newTime / s % m)
        const newSec = Math.floor(newTime % s)
        setDate(newDate)
        setHour(newHour)
        setMin(newMin)
        setSec(newSec)
    }

    const timeCount = () => {
        setTimeRemain(timeRemain => timeRemain - 1)
    }

    const timeOver = () => {
        if (onTimeOver) onTimeOver()
    }

    const getNumberpad = (number, string) => {
        let numberStr = number > 9 ? "" + number : "0" + number
        if (number < 0) numberStr = "00"

        return (
            <NumberPad>{numberStr.split('').map((el, i) => {
                return <NumberPannel key={string + el + i}>{el}</NumberPannel>
            })}{string}</NumberPad>
        )
    }

    return (
        <ComponentWrapper>
            {
                duedate ?
                    <NumberpadWrapper>
                        {
                            date > 0 ?
                                getNumberpad(date, "일")
                                : null
                        }
                        {getNumberpad(hour, "시")}
                        {getNumberpad(min, "분")}
                        {
                            date < 1 ?
                                getNumberpad(sec, "초")
                                : null
                        }
                    </NumberpadWrapper>
                    : null
            }
            <div>{text}</div>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: #373737;
    align-items: center;
    justify-content: center;
    width: fit-content;
    padding: 1.5rem 0.5rem;
    border-radius: 0.75rem;
    color: white;
    opacity: 0.6;
`

const NumberpadWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const NumberPad = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const NumberPannel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    width: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
    border-radius: 0.5rem;
    margin: 0.15rem;
    background: white;
    color: black;
`

export default Timer