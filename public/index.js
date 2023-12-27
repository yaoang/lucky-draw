var names = csvToJson(csv)

const shuffle = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        const random = Math.floor(Math.random() * (i + 1))
        // [arr[i], arr[random]] = [arr[random], arr[i]]
        const tmp = arr[i]
        arr[i] = arr[random]
        arr[random] = tmp
    }
    return arr
}
