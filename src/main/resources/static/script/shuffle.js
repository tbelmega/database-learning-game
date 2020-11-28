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

/* gray out cards by updating the "match" property of every card according to current filters. */
function filterBoard(board, criteria) {
    console.log(criteria);
    board.forEach(card => {
        card.match = criteria.every(item => {
            let cardValue = card[item.property.toLowerCase()].toLowerCase();
            let criteriaValue = item.value.toLowerCase();
            switch (item.operator) {
                case '=':
                    return cardValue === criteriaValue;
                case '!=':
                    return cardValue !== criteriaValue;
                default:
                    throw new Error('Unhandled Operator');
            }
        });
    });
}
