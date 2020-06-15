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

    /* a set is found when there are only 3 cards remaining, which have ALL SAME or ALL DIFFERENT values in all properties */
    function checkIfSetFound() {
        let activeCards = board.filter(card => card.match);

        if (activeCards.length !== 3) return false;

        let card1 = activeCards[0];
        let card2 = activeCards[1];
        let card3 = activeCards[2];

        function allSame(property) {
            return card1[property] === card2[property] && card1[property] === card3[property];
        }

        function allDifferent(property) {
            return card1[property] !== card2[property]
                && card1[property] !== card3[property]
                && card2[property] !== card3[property];
        }

        let shape = allSame("shape") || allDifferent("shape");
        let color = allSame("color") || allDifferent("color");
        let fill = allSame("fill") || allDifferent("fill");
        let count = allSame("count") || allDifferent("count");

        return shape && color && fill && count;
    }

    function update() {
        filterBoard(board, criteria);
        drawBoard(board);
        drawCriteriaList(criteria);
        let setFound = checkIfSetFound(board);
        if (setFound) alert("Set found!");
    }

    update();
    initPropertySelect(criteria, update);

}

runGame();
