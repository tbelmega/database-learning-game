// RegEx-Literals (Regular Expressions to identify syntactically correct parts of the input)
// The slashes mark begin and end of regex. the i makes the regex case-insensitive

// select clause is always 'select *' in this sandbox
let SELECT_CLAUSE = /select \* /i;

// from clause begins with 'from' and has a table name
let FROM_CLAUSE = /from ([a-zA-Z0-9_]+)/i;

// where clause begins with 'where' and ends with optional ';'. allows letters, digits, space, ! = and '
let WHERE_CLAUSE = / where ([a-zA-Z0-9_\s!=']+)[;]*/i;

// each criteria has three pieces (columname, operator and value) separated by optional space characters. value is in single quotes
let CRITERIA = /([a-zA-Z0-9_]+)(?:\s*)(=|!=)(?:\s*)'([a-zA-Z0-9_]+)'/i;

function executeSql(input, board1, board2) {
    // check if there is a select clause
    let selectClause = input.match(SELECT_CLAUSE);
    if (!selectClause)
        return "Deine SQL-Abfrage muss mit einer Select-Klausel beginnen: " +
            "<code>SELECT *</code>";

    // check if there is a from clause
    let fromClause = input.match(FROM_CLAUSE);
    if (!fromClause)
        return "Deine SQL-Abfrage braucht eine From-Klausel. " +
            "Die From-Klausel bestimmt, von welchem Board du Karten auswählen willst: " +
            "<code>FROM board1</code>";

    // activate cards from the board thats defined in the from clause
    let fromBoard;
    switch (fromClause[1]) {
        case 'board1':
            fromBoard = board1;
            board1.forEach(card => card.match = true);
            board2.forEach(card => card.match = false);
            break;
        case 'board2':
            fromBoard = board2;
            board2.forEach(card => card.match = true);
            board1.forEach(card => card.match = false);
            break;
        default:
            fromBoard = undefined;
            board1.forEach(card => card.match = false);
            board2.forEach(card => card.match = false);
            break;
    }
    drawSandboxBoards(board1, board2);

    if (!fromBoard) {
        return "Nenne in der From-Klausel entweder <code>board1</code> oder <code>board2</code> als Ziel deiner Abfrage."
    }

    // check if there is a where clause
    let whereClause = input.match(WHERE_CLAUSE);
    if (!whereClause) {
        return "Deine SQL-Abfrage kann eine Where-Klausel haben, in der die Auswahlbedingungen festgelegt werden. " +
            "Ohne Where-Klausel bleiben alle Karten ausgewählt. Deine Where-Klausel kann ein oder mehrere Bedingungen enthalten, die mit <code>and</code> verbunden werden: <code>WHERE ... AND ...;</code>";
    }

    // get the conditions separated by AND
    let inputConditions = whereClause[1].split(/AND/i);
    let capturedConditions = inputConditions.map((c) => c ? c.match(CRITERIA) : null);

    // check if one of the conditions is not syntactically correct
    let brokenCondition = capturedConditions.indexOf(null);
    if (brokenCondition > -1) {
        return "Deine Abfragebedingung <code>" + inputConditions[brokenCondition] + "</code> ist fehlerhaft. " +
            "Eine Abfragebedingung beginnt mit einem Spaltennamen (color, count, fill oder shape), " +
            "hat einen Vergleichsoperator (= oder !=) " +
            "und einen Wert in einfachen Anführungszeichen: <code>color = 'red'</code>"
    }

    // transform the found conditions into criteria-objects for the filter function
    let criteria = capturedConditions.map(c => ({
        property: c[1],
        operator: c[2],
        value: c[3]
    }));

    // apply criteria and draw the updated boards
    filterBoard(fromBoard, criteria);
    drawSandboxBoards(board1, board2);
    return "Super! Deine SQL-Abfrage ist valide.";
}

function startSandbox() {
    let board1cards = shuffleUpAndDeal([], 12);
    let board2cards = shuffleUpAndDeal([], 12);
    drawSandboxBoards(board1cards, board2cards);

    // bind the executeSql function to the button on the UI
    // on click, parse the input, execute sql and display feedback to user
    let sqlStatement = document.getElementById('sql-statement-input');
    document.getElementById('execute-sql').onclick = () => {
        const validationErrorMessage = executeSql(sqlStatement.value, board1cards, board2cards);
        document.getElementById('parse-output').innerHTML = validationErrorMessage || '';
    }
}
