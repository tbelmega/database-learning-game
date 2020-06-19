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
