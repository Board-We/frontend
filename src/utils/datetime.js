
export const get4WeekDateTime = (baseTime) => {
    console.log(baseTime)
    const newDates = []
    const oneDay = 60 * 60 * 24 * 1000
    const hour = 24
    const day = (new Date().getTime() + oneDay * 14 - baseTime.getTime()) / oneDay

    console.log(day)

    for (let i = 0; i < hour * day; i++) {
        newDates.push(new Date(baseTime.getTime() + 3600000 * i))
    }

    return newDates
}