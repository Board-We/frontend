export const get4WeekDateTime = (baseTime) => {
    const newDates = []
    const oneDay = 60 * 60 * 24 * 1000
    const hour = 24
    const day = (new Date().getTime() + oneDay * 28 - baseTime.getTime()) / oneDay

    for (let i = 1; i < hour * day; i++) {
        newDates.push(new Date(baseTime.getTime() + 3600000 * i))
    }

    return newDates
}