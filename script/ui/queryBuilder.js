/* draw the criteria list to screen */
function drawCriteriaList(criteria) {
    const CRITERIA_LIST_UI = document.getElementById("criteria-list");
    CRITERIA_LIST_UI.innerHTML = '';

    Object.entries(criteria).forEach(item => {
        let criteriaNode = document.createElement('li');
        criteriaNode.innerHTML = `<span>${item[0]}</span><span>=</span><span>${item[1]}</span>`;
        CRITERIA_LIST_UI.appendChild(criteriaNode)
    });
}

/* toggle between displaying the query builder or the set-found section */
function toggleQueryBuilder(continueFunction) {
    const QUERY_BUILDER_UI = document.getElementById("query-builder");
    const SET_FOUND_CONTINUE_UI = document.getElementById("set-found-continue");
    const CONTINUE_BUTTON = document.getElementById("continue");

    QUERY_BUILDER_UI.classList.toggle("d-none");
    SET_FOUND_CONTINUE_UI.classList.toggle("d-none");
    CONTINUE_BUTTON.onclick = continueFunction;
}

/* fill the property dropdown with the available properties in the game (COLOR, SHAPE, COUNT, FILL)*/
function initPropertySelect(criteria, update) {
    const propertySelect = document.getElementById("property-select");
    propertySelect.innerHTML = '<option value="none">-Auswählen-</option>';
    propertySelect.value = 'none';

    CARD_PROPERTIES.forEach(property => {
        let option = document.createElement('option');
        option.innerText = property;
        propertySelect.appendChild(option);
    })
    propertySelect.onchange = event => {
        populateValueSelect(event.target.value, criteria, update);
    }
}

/* fill the value dropdown with the values of the selected property (e.g. RED,... if COLOR is selected)*/
function populateValueSelect(property, criteria, update) {
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
        initPropertySelect(criteria, update);
        resetValueSelect();
    }
}
