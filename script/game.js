/* fill the board with 12 new random cards */
function shuffleUpAndDeal() {
    const board = [];
    for (let i = 0; i < 12; i++) {
        board.push({
            color: randomFrom(COLORS),
            shape: randomFrom(SHAPES),
            count: randomFrom(COUNT),
            fill: randomFrom(FILLS),
            match: true
        })
    }
    return board;
}

/* update the "match" property of every card according to current filters */
function filterBoard(board, criteria) {
    board.forEach((card) => {
        card.match = Object.entries(criteria).every(item => {
            let cardValue = card[item[0].toLowerCase()];
            let criteriaValue = item[1];
            return cardValue === criteriaValue
        });
    });
}

function runGame() {

    // represents the query selection criteria currently set by the user
    let criteria = {};

    const board = shuffleUpAndDeal();

    function update() {
        filterBoard(board, criteria);
        drawBoard(board);
        drawCriteriaList(criteria);
    }

    update();
    resetPropertySelect();

}

runGame();
