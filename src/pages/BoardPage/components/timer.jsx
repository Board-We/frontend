import React, { useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"
import styled from "styled-components"

const Timer = ({ duedate, onTimeOver }) => {

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

    return (
        <ComponentWrapper>
            {`${date}일`}{`${hour}시`}{`${min}분`}{`${sec}초`}
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    
`

const NumberPad = styled.div`
    
`

export default Timer