function draw(BOARD_UI, board) {
    BOARD_UI.innerHTML = null;
    BOARD_UI.classList.remove(...BOARD_UI.classList);
    BOARD_UI.classList.add('card-board');
    BOARD_UI.classList.add('card-board-' + board.length);

    board.forEach((card) => {
        let cardNode = document.createElement('span');
        let cardId = `${card.color}-${card.shape}-${card.count}-${card.fill}`;
        cardNode.style.backgroundImage = `url("../images/cards/${cardId}.png")`;
        cardNode.classList.add('card')
        cardNode.classList.add(cardId)
        BOARD_UI.appendChild(cardNode);

        if (card.match) {
            cardNode.classList.remove("fade");
            cardNode.classList.add('elevate')
        } else {
            cardNode.classList.add("fade");
        }
    });
}

/* draw the board to screen by adding a <span> with background image that represents the card */
function drawBoard(board) {
    draw(document.getElementById("board"), board);
}

function drawSandboxBoards(board1, board2) {
    draw(document.getElementById("board1"), board1);
    draw(document.getElementById("board2"), board2);
}
