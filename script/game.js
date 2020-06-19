
/* fill the board with 12 new random cards */
function shuffleUpAndDeal() {

    /* check if card with same ID is already on the board. otherwise add card to board.*/
    function addCardIfNotYetOnBoard(card, board) {
        const positionOfCardOnBoard = board.findIndex(element => element.id === card.id, card);

        if (positionOfCardOnBoard === NOT_THERE)
            board.push({
                ...card,
                match: true
            })
    }

    const board = [];
    do {
        let card = randomFrom(ALL_CARDS);
        addCardIfNotYetOnBoard(card, board);
    } while (board.length < 12);

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
    let score = 0;

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

        return {
            isSet: shape && color && fill && count,
            cards: [card1, card2, card3]
        };
    }

    function update() {
        filterBoard(board, criteria);
        drawBoard(board);
        drawCriteriaList(criteria);
        let setFound = checkIfSetFound(board);
        if (setFound.isSet) {
            score += 50;
            drawScore(score);
        }
    }

    update();
    initPropertySelect(criteria, update);

}

runGame();
