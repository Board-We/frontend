export const get4WeekDateTime = (baseTime) => {
    const newDates = []
    const hour = 24
    const day = 7

    for (let i = 0; i < hour * day; i++) {
        newDates.push(new Date(baseTime.getTime() + 3600000 * i))
    }

    return newDates
}