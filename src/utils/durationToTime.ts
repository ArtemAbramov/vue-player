export const durationToTime = (time) => {
    const secondsStr = isNaN(time) ? '00' : `${Math.floor(time) % 60 < 10 ? `0${Math.floor(time) % 60}` : Math.floor(time) % 60}`
    const minutesStr = isNaN(time) ? '0' : `${Math.floor(Math.floor(time) / 60)}`
    return `${minutesStr}:${secondsStr}`
}