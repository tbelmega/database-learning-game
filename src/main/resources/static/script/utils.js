function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/* utility function to get a random element from a given array */
function randomFrom(array) {
    return array[randomInt(array.length)]
}
