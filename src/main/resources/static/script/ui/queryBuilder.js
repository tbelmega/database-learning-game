/* draw the criteria list to screen */
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


function resetSelect(select, valueCollection) {
    select.innerHTML = '<option value="none">-Auswählen-</option>';
    select.value = 'none';
    valueCollection.forEach(value => {
        let option = document.createElement('option');
        option.innerText = value;
        select.appendChild(option);
    });
}

/* fill the property dropdown with the available properties in the game (COLOR, SHAPE, COUNT, FILL)*/
function initPropertySelect(criteria, update) {
    const propertySelect = document.getElementById("property-select");
    const operatorSelect = document.getElementById("operator-select");

    resetSelect(propertySelect, CARD_PROPERTIES);

    let selectedProperty;
    propertySelect.onchange = event => {
        selectedProperty = event.target.value;

        if (propertySelect.selectedIndex > 0) {
            operatorSelect.classList.remove('d-none');
            resetSelect(operatorSelect, OPERATORS);
        } else
            operatorSelect.classList.add('d-none');
    }

    operatorSelect.onchange = () => {
        const valueSelect = document.getElementById("value-select");

        if (operatorSelect.selectedIndex > 0) {
            let selectedOperator = OPERATORS[operatorSelect.selectedIndex - 1];
            populateValueSelect(selectedProperty, selectedOperator, criteria, update);
            valueSelect.classList.remove('d-none');
        } else
            valueSelect.classList.add('d-none');
    }
}


/* fill the value dropdown with the values of the selected property (e.g. RED,... if COLOR is selected)*/
function populateValueSelect(property, operator, criteria, update) {
    const valueSelect = document.getElementById("value-select");


    resetSelect(valueSelect, CARD_VALUES[property]);

    valueSelect.onchange = (event) => {
        criteria.push({
            'property': property,
            'operator': operator,
            'value': event.target.value
        });
        update();
        initPropertySelect(criteria, update);


        let operatorSelect = document.getElementById("operator-select");
        operatorSelect.classList.add('d-none');
        valueSelect.classList.add('d-none');
    }
}
