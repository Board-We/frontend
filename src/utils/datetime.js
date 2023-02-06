export const get4WeekDateTime = (baseTime, containNow) => {
    const newDates = []
    const hour = 24
    const day = 7
    const startIndex = containNow ? 0 : 1

    for (let i = startIndex; i < hour * day; i++) {
        newDates.push(new Date(baseTime.getTime() + 3600000 * i))
    }

    return newDates
}