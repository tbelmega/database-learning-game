/* fill the board with 12 new random cards */
function shuffleUpAndDeal(board, maxNumberOfCards) {

    /* check if card with same ID is already on the board. otherwise add card to board.*/
    function addCardIfNotYetOnBoard(card, board) {
        const positionOfCardOnBoard = board.findIndex(element => element.id === card.id, card);

        if (positionOfCardOnBoard === NOT_THERE)
            board.push({
                ...card,
                match: true
            })
    }

    do {
        let card = randomFrom(ALL_CARDS);
        addCardIfNotYetOnBoard(card, board);
    } while (board.length < maxNumberOfCards);

    return board;
}

/* update the "match" property of every card according to current filters */
function filterBoard(board, criteria) {
    board.forEach((card) => {
        card.match = criteria.every(item => {
            let cardValue = card[item.property.toLowerCase()];
            let criteriaValue = item.value;
            return cardValue === criteriaValue
        });
    });
}

function runGame() {

    // represents the query selection criteria currently set by the user
    let criteria = [];
    let score = 0;

    let board = shuffleUpAndDeal([], 12);

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

    function removeFoundSetFromBoard(cards) {
        const cardIdsToRemove = cards.map(card => card.id);
        board = board.filter(card => cardIdsToRemove.indexOf(card.id) === NOT_THERE);
        shuffleUpAndDeal(board, 12);
        toggleQueryBuilder();
    }

    function resetCriteria() {
        criteria = [];
        initPropertySelect(criteria, update);
    }

    function removeCriteria(criteria, item) {
        let itemToDelete = criteria.indexOf((c) => c.property === item.property && c.value === item.value);
        criteria.splice(itemToDelete, 1);
        update();
    }

    function update() {
        filterBoard(board, criteria);
        drawBoard(board);
        drawScore(score);
        drawCriteriaList(criteria, removeCriteria);
        let setFound = checkIfSetFound(board);
        if (setFound.isSet) {
            score += SCORE_FOR_FOUND_SET;
            drawScore(score);
            toggleQueryBuilder(() => {
                removeFoundSetFromBoard(setFound.cards);
                resetCriteria();
                update();
            });
        }
    }

    update();
    initPropertySelect(criteria, update);
    initAddCardsButton(() => {
        if (board.length < MAX_CARDS_ON_BOARD) {
            shuffleUpAndDeal(board, board.length + 3);
            score -= SCORE_PENALTY_FOR_MORE_CARDS;
            update();
        }
    });
    initRemoveCardsButton(() => {
        if (board.length > MIN_CARDS_ON_BOARD) {
            board.shift();
            board.shift();
            board.shift();
            console.log(board.length)
            score -= SCORE_PENALTY_FOR_MORE_CARDS;
            update();
        }
    });
}

runGame();
