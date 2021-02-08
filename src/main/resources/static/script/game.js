function renderSqlQueryFromCriteria(criteria) {
    let whereClause = criteria.map(crit =>
        crit.property.toLowerCase() + " "
        + crit.operator + " '"
        + crit.value.toLowerCase() + "'")
        .join(" AND ");
    if (whereClause) whereClause = " WHERE " + whereClause;
    return '<code>SELECT * FROM cards' + whereClause + ';</code>';
}

/* main game function */
function runGame() {

    // represents the query selection criteria currently set by the user
    let criteria = [];
    let score = 0;
    let gameClockSeconds = MAX_GAME_TIME_SECONDS;
    let gameClock;

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
        if (board.length < 12)
            shuffleUpAndDeal(board, 12);
        toggleQueryBuilder();
    }

    function removeCardFromBoard(cardToRemove) {
        let boardLength = board.length;
        board = board.filter(card => card.id !== cardToRemove.id);
        if (board.length < 12)
            shuffleUpAndDeal(board, boardLength);
        update();
    }

    function resetCriteria() {
        criteria = [];
        initQueryBuilder(criteria, update);
    }

    function removeCriteria(criteria, item) {
        let itemToDelete = criteria.indexOf((c) => c.property === item.property && c.value === item.value);
        criteria.splice(itemToDelete, 1);
        update();
    }

    function update() {
        filterBoard(board, criteria);
        drawBoard(board, removeCardFromBoard);
        drawScore(score);
        drawCriteriaList(criteria, removeCriteria);
        let setFound = checkIfSetFound(board);
        if (setFound.isSet) {
            score += SCORE_FOR_FOUND_SET;
            document.getElementById('sql-code').innerHTML = renderSqlQueryFromCriteria(criteria);
            drawScore(score);
            toggleQueryBuilder(() => {
                removeFoundSetFromBoard(setFound.cards);
                resetCriteria();
                update();
            });
        }
    }

    function startClock() {
        gameClockSeconds = MAX_GAME_TIME_SECONDS;
        gameClock = setInterval(() => {
                gameClockSeconds -= 1;
                updateClock(gameClockSeconds);
                if (gameClockSeconds <= 0) {
                    clearInterval(gameClock);
                    backToMenu(score);

                }
            },
            1000
        );

        const endGameBtn = document.getElementById("end-game");
        endGameBtn.onclick = () => {
            clearInterval(gameClock);
            backToMenu(score);
        }
    }

    update();
    updateClock(gameClockSeconds);
    initQueryBuilder(criteria, update);
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
    initReshuffleButton(() => {
        board = shuffleUpAndDeal([], board.length);
        score -= SCORE_PENALTY_FOR_MORE_CARDS;
        update();
    });
    startClock();
}


initGameMenu(runGame);
