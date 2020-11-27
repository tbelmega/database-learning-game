/* the "score" section of the UI holds the current player score, timer and buttons to add/remove cards */

function drawScore(score) {
    const SCORE_UI = document.getElementById("score");
    SCORE_UI.innerText = score;
}

function initAddCardsButton(addCardsFunction) {
    const ADD_CARD_BUTTON = document.getElementById("add-cards");
    ADD_CARD_BUTTON.onclick = addCardsFunction;
}

function initRemoveCardsButton(removeCardsFunction) {
    const REMOVE_CARD_BUTTON = document.getElementById("remove-cards");
    REMOVE_CARD_BUTTON.onclick = removeCardsFunction;
}

function initReshuffleButton(reshuffleFunction) {
    const RESHUFFLE_BUTTON = document.getElementById("btn-reshuffle");
    RESHUFFLE_BUTTON.onclick = reshuffleFunction;
}

function updateClock(gameClockSeconds) {
    const CLOCK_UI = document.getElementById("game-clock");
    const minutes = Math.floor(gameClockSeconds / 60);
    let seconds = gameClockSeconds % 60;
    if (seconds < 10) seconds = '0' + seconds
    CLOCK_UI.innerText = `${minutes}:${seconds}`;
}
