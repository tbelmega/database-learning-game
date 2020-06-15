function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function randomFrom(values) {
    return values[randomInt(values.length)]
}

function runGame() {

    /* all available property values for cards in the game */
    const CARD_PROPERTIES = ['COLOR', 'SHAPE', 'COUNT', 'FILL'];
    const COLORS = ['RED'];
    const SHAPES = ['RECT', 'OVAL', 'DIAMOND'];
    const COUNT = ['1', '2', '3'];
    const FILLS = ['FULL', 'TRANSPARENT', 'EMPTY'];
    const CARD_VALUES = { COLOR: COLORS, SHAPE: SHAPES, COUNT: COUNT, FILL: FILLS }

    // represents the query selection criteria currently set by the user
    let criteria = {};

    /* fill the board with 12 new random cards */
    function shuffleUpAndDeal() {
        const board = [];
        for (let i = 0; i < 12; i++) {
            board.push({
                color: randomFrom(COLORS),
                shape: randomFrom(SHAPES),
                count: randomFrom(COUNT),
                fill: randomFrom(FILLS)
            })
        }
        return board;
    }

    const board = shuffleUpAndDeal();

    /* draw the board to screen by adding a <span> with background image that represents the card */
    function drawBoard(board) {
        const BOARD_UI = document.getElementById("board");

        BOARD_UI.innerHTML = null;
        BOARD_UI.classList.add('card-board-' + board.length);

        board.forEach((card) => {
            let cardNode = document.createElement('span');
            let cardId = `${card.color}-${card.shape}-${card.count}-${card.fill}`;
            cardNode.style.backgroundImage =  `url("images/cards/${cardId}.png")`;
            cardNode.classList.add('card')
            cardNode.classList.add(cardId)
            BOARD_UI.appendChild(cardNode);

            let match =  Object.entries(criteria).every(item => {
                let cardValue = card[item[0].toLowerCase()];
                console.log(cardValue);
                let criteriaValue = item[1];
                console.log(criteriaValue);
                return cardValue === criteriaValue
            })

            if (match)
                cardNode.classList.remove("fade");
            else
                cardNode.classList.add("fade");
        });
    }

    drawBoard(board);

    /* fill the property dropdown with the available properties in the game (COLOR, SHAPE, COUNT, FILL)*/
    function populatePropertySelect() {
        const propertySelect = document.getElementById("property-select");
        CARD_PROPERTIES.forEach(property => {
            let option = document.createElement('option');
            option.innerText = property;
            propertySelect.appendChild(option);
        })
        propertySelect.onchange = event => {
            populateValueSelect(event.target.value);
        }
    }

    /* fill the value dropdown with the values of the selected property (e.g. RED,... if COLOR is selected)*/
    function populateValueSelect(property) {
        const valueSelect = document.getElementById("value-select");
        valueSelect.innerHTML = '<option>-Auswählen-</option>';
        CARD_VALUES[property].forEach(value => {
            let option = document.createElement('option');
            option.innerText = value;
            valueSelect.appendChild(option);
        });

        valueSelect.onchange = (event) => {
            criteria[property] = event.target.value;

            drawBoard(board);
        }
    }

    populatePropertySelect();

}

runGame();
