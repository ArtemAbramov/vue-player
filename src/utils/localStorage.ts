export const setToStorage = (key, value) => {
    localStorage.setItem(key, value)
}

export const getFromStorage = (key) => {
    const value = localStorage.getItem(key)
    return value
}