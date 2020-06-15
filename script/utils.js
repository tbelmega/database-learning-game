function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function randomFrom(array) {
    return array[randomInt(array.length)]
}
