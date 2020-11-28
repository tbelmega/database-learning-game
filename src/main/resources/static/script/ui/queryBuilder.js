/* draw the criteria list to screen. criteria list is the list of user-selected criteria, e.g. "SHAPE = RECT" and so on. */
function drawCriteriaList(criteria, removeCriteriaFn) {
    const CRITERIA_LIST_UI = document.getElementById("criteria-list");
    CRITERIA_LIST_UI.innerHTML = '';

    function createRemoveButton(removeCriteriaFn) {
        const removeBtn = document.createElement('span');
        removeBtn.classList.add('close-btn');
        removeBtn.onclick = removeCriteriaFn;
        return removeBtn;
    }

    criteria.forEach(item => {
        let entryNode = document.createElement('li');
        entryNode.classList.add('query-criteria');
        let criteriaNode = document.createElement('div');
        criteriaNode.innerHTML = `<span>${item.property}</span><span>${item.operator}</span><span>${item.value}</span>`;
        entryNode.appendChild(criteriaNode);
        entryNode.appendChild(createRemoveButton(() => removeCriteriaFn(criteria, item)));
        CRITERIA_LIST_UI.appendChild(entryNode)
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
function initQueryBuilder(criteria, update) {

    const btnGroupProperty = document.getElementById("query-builder-property");
    const btnGroupOperator = document.getElementById("query-builder-operator");
    const btnGroupValue = document.getElementById("query-builder-value");

    btnGroupProperty.innerHTML = '';
    btnGroupOperator.innerHTML = '';
    btnGroupValue.innerHTML = '';

    let selectedProperty;
    let selectedOperator;

    function initOperatorSelector() {
        btnGroupOperator.innerHTML = '';
        OPERATORS.forEach(value => {

            let label = document.createElement('label');
            label.classList.add('btn', 'btn-primary');
            label.innerHTML = `<input type="radio" name="options" id="option-${value}">${value}</input>`;

            btnGroupOperator.appendChild(label);
            label.onclick = (event) => {
                event.preventDefault();
                selectedOperator = value;
                initValueSelector();
            };
        });
    }

    function initValueSelector() {
        btnGroupValue.innerHTML = '';
        CARD_VALUES[selectedProperty].forEach(value => {

            let label = document.createElement('label');
            label.classList.add('btn', 'btn-primary');
            label.innerHTML = `<input type="radio" name="options" id="option-${value}">${value}</input>`;

            btnGroupValue.appendChild(label);

            label.onclick = (event) => {
                event.preventDefault();
                criteria.push({
                    property: selectedProperty,
                    operator: selectedOperator,
                    value: value
                });
                initQueryBuilder(criteria, update);
                update();
            };
        });
    }


    function initPropertySelector() {
        btnGroupProperty.innerHTML = '';
        CARD_PROPERTIES.forEach(value => {

            let label = document.createElement('label');
            label.classList.add('btn', 'btn-primary');
            label.innerHTML = `<input type="radio" name="options" id="option-${value}">${value}</input>`;

            btnGroupProperty.appendChild(label);
            label.onclick = (event) => {
                event.preventDefault();
                selectedProperty = value;
                initOperatorSelector();
            };
        });
    }

    initPropertySelector();
}
