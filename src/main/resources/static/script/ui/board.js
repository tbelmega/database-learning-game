function draw(BOARD_UI, board, removeCardFn) {
    BOARD_UI.innerHTML = null;
    BOARD_UI.classList.remove(...BOARD_UI.classList);
    BOARD_UI.classList.add('card-board');
    BOARD_UI.classList.add('card-board-' + board.length);

    let activeCards = board.filter(card => card.match).length;
    console.log(activeCards);

    board.forEach((card) => {
        let cardNode = document.createElement('span');
        let cardId = `${card.color}-${card.shape}-${card.count}-${card.fill}`.toLowerCase();
        cardNode.style.backgroundImage = `url("../images/cards/${cardId}.png")`;
        cardNode.classList.add('card')
        cardNode.classList.add(cardId)
        BOARD_UI.appendChild(cardNode);

        if (card.match) {
            cardNode.classList.remove("fade");
            cardNode.classList.add('elevate')
            console.log("Checking for remove button: " + activeCards)
            if (removeCardFn && activeCards <= 6 && activeCards > 3) {
                let removeButton = document.createElement('span');
                removeButton.classList.add('close-btn');
                removeButton.onclick = () => removeCardFn(card);
                cardNode.appendChild(removeButton);
            }
        } else {
            cardNode.classList.add("fade");
        }
    });
}

/* draw the board to screen by adding a <span> with background image that represents the card */
function drawBoard(board, removeCardFn) {
    draw(document.getElementById("board"), board, removeCardFn);
}

function drawSandboxBoards(board1, board2) {
    draw(document.getElementById("board1"), board1);
    draw(document.getElementById("board2"), board2);
}
