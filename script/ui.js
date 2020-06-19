/* draw the board to screen by adding a <span> with background image that represents the card */
function drawBoard(board) {
    const BOARD_UI = document.getElementById("board");

    BOARD_UI.innerHTML = null;
    BOARD_UI.classList.add('card-board-' + board.length);

    board.forEach((card) => {
        let cardNode = document.createElement('span');
        let cardId = `${card.color}-${card.shape}-${card.count}-${card.fill}`;
        cardNode.style.backgroundImage = `url("images/cards/${cardId}.png")`;
        cardNode.classList.add('card')
        cardNode.classList.add(cardId)
        BOARD_UI.appendChild(cardNode);

        if (card.match) {
            cardNode.classList.remove("fade");
        } else {
            cardNode.classList.add("fade");
        }
    });
}

function drawScore(score) {
    const SCORE_UI = document.getElementById("score");
    SCORE_UI.innerText = score;
}
