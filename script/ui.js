/* draw the criteria list to screen */
function drawCriteriaList(criteria) {
    const CRITERIA_LIST_UI = document.getElementById("criteria-list");
    CRITERIA_LIST_UI.innerHTML = '';

    Object.entries(criteria).forEach(item => {
        let criteriaNode = document.createElement('li');
        criteriaNode.innerText = item;
        CRITERIA_LIST_UI.appendChild(criteriaNode)
    });
}

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

/* fill the property dropdown with the available properties in the game (COLOR, SHAPE, COUNT, FILL)*/
function resetPropertySelect() {
    const propertySelect = document.getElementById("property-select");
    propertySelect.innerHTML = '<option value="none">-Auswählen-</option>';
    propertySelect.value = 'none';

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

    function resetValueSelect() {
        valueSelect.innerHTML = '<option value="none">-Auswählen-</option>';
    }

    resetValueSelect();
    CARD_VALUES[property].forEach(value => {
        let option = document.createElement('option');
        option.innerText = value;
        valueSelect.appendChild(option);
    });

    valueSelect.onchange = (event) => {
        criteria[property] = event.target.value;
        update();
        resetPropertySelect();
        resetValueSelect();
    }
}
