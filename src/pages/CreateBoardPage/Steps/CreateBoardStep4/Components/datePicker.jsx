import { useEffect, useState } from "react"
import styled from "styled-components"
import { get4WeekDateTime } from "../../../../../utils/datetime"
import Picker from "./picker"

const DatePicker = ({ datetime, text="부터" }) => {
    const [dateObjects, setDateObjects] = useState([])
    const [years, setYears] = useState({});
    const [dates, setDates] = useState({});
    const [hours, setHours] = useState({});
    const [selectedYear, setSelectedYear] = useState()
    const [selectedDate, setSelectedDate] = useState()
    const [selectedHour, setSelectedHour] = useState()

    useEffect(() => {
        createDateObjects()
    }, [])

    useEffect(() => {
        parseDateObjects()
    }, [dateObjects])

    useEffect(() => {
        initSelectedTime()
    }, [years, dates, hours])

    useEffect(() => {
        setDateByYear()
    }, [selectedYear])

    useEffect(() => {
        setHourByDate()
    }, [selectedDate])

    const createDateObjects = () => {
        const newDateObjects = get4WeekDateTime(datetime ? datetime : new Date())
        setDateObjects(newDateObjects)
    }

    const parseDateObjects = () => {
        if (dateObjects.length === 0) return

        const newYears = {}
        const newDates = {}
        const newHours = {}
        dateObjects.forEach(el => {
            const yearStr = `${el.getFullYear()}년`
            const dateStr = `${el.getMonth() + 1}월${el.getDate()}일`
            const hourStr = `${el.getHours()}시`
            const yearObj = newYears[yearStr]
            const dateObj = newDates[dateStr]
            const hourObj = newHours[hourStr]

            if (!yearObj) newYears[yearStr] = {}
            newYears[yearStr][dateStr] = true
            if (!dateObj) newDates[dateStr] = {}
            newDates[dateStr][hourStr] = true
            if (!hourObj) newHours[hourStr] = true
        })

        setYears(newYears)
        setDates(newDates)
        setHours(newHours)
    }

    const initSelectedTime = () => {
        if (getKeys(years).length === 0 || getKeys(dates).length === 0 || getKeys(hours).length === 0) return

        const initYear = getKeys(years)[0]
        const initDate = getKeys(years[initYear])[0]
        const initHour = getKeys(dates[initDate])[0]

        setSelectedYear(initYear)
        setSelectedDate(initDate)
        setSelectedHour(initHour)
    }

    const setDateByYear = () => {
        if (getKeys(years).length === 0) return
        const newSelectedDate = getKeys(years[selectedYear])[0]
        setSelectedDate(newSelectedDate)
    }

    const setHourByDate = () => {
        if (getKeys(dates).length === 0) return
        const newSelectedHour = getKeys(dates[selectedDate])[0]
        setSelectedHour(newSelectedHour)
    }

    const getKeys = (obj) => {
        return Object.keys(obj)
    }

    return (
        <ComponentWrapper>
            {
                selectedHour && (
                    <>
                        <Picker data={getKeys(years)} selectedData={selectedYear} setSelectedData={setSelectedYear}/>
                        <Picker data={getKeys(years[selectedYear])} selectedData={selectedDate} setSelectedData={setSelectedDate} />
                        <Picker data={getKeys(dates[selectedDate])} selectedData={selectedHour} setSelectedData={setSelectedHour} />
                        {text}
                    </>
                )
            }
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    height: max-content;
    max-width: 600px;
    background: green;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export default DatePicker