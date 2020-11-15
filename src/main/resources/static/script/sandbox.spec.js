describe('sandbox.js', () => {
    describe('regular expressions', function () {

        let validQuery = "SELECT * FROM board1 WHERE color = 'blue' AND shape = 'oval';";

        describe('the SELECT-clause RegEx', function () {

            it('should match a valid query', function () {
                expect(SELECT_CLAUSE.test(validQuery)).toBe(true);
            });

            it('should not match invalid query', function () {
                let invalidQuery = "SELECT FROM board1 WHERE color = 'blue' AND shape = 'oval';"
                expect(SELECT_CLAUSE.test(invalidQuery)).toBe(false);
            });

        });

        describe('the FROM-clause RegEx', function () {

            it('should match a valid query', function () {
                expect(FROM_CLAUSE.test(validQuery)).toBe(true);
            });

            it('should not match query without FROM', function () {
                let invalidQuery = "SELECT * WHERE color = 'blue' AND shape = 'oval';"
                expect(FROM_CLAUSE.test(invalidQuery)).toBe(false);
            });

        });

        describe('the WHERE-clause RegEx', function () {

            it('should match a valid query', function () {
                expect(WHERE_CLAUSE.test(validQuery)).toBe(true);
            });

            it('should not match query without WHERE', function () {
                let invalidQuery = "SELECT * FROM board1;"
                expect(WHERE_CLAUSE.test(invalidQuery)).toBe(false);
            });

        });

        describe('the CRITERIA-clause RegEx', function () {

            it('should match a valid query', function () {
                expect(CRITERIA.test(validQuery)).toBe(true);
            });

            it('should not match query without WHERE', function () {
                let invalidQuery = "SELECT * FROM board1;"
                expect(CRITERIA.test(invalidQuery)).toBe(false);
            });

            it('should extract column, operator and value', function () {
                let regExpMatchArray = validQuery.match(CRITERIA);
                expect(regExpMatchArray[0]).toBe("color = 'blue'");
                expect(regExpMatchArray[1]).toBe("color");
                expect(regExpMatchArray[2]).toBe("=");
                expect(regExpMatchArray[3]).toBe("blue");
            });

        });
    });

    describe('executeSql', function () {

        beforeEach(() => {
            drawSandboxBoards = jasmine.createSpy('stub');
            filterBoard = jasmine.createSpy('filterBoard');
        });

        it('should ask for a SELECT clause', function () {
            let invalidQuery = "SELECT FROM board1 WHERE color = 'blue' AND shape = 'oval';"
            let validationMessage = executeSql(invalidQuery);
            expect(validationMessage).toContain('Select-Klausel');
        });

        it('should ask for a FROM clause', function () {
            let invalidQuery = "SELECT *  WHERE color = 'blue' AND shape = 'oval';"
            let validationMessage = executeSql(invalidQuery);
            expect(validationMessage).toContain('From-Klausel');
        });

        it('should ask for a WHERE clause', function () {
            let invalidQuery = "SELECT * FROM board1;"
            let validationMessage = executeSql(invalidQuery, [], []);
            expect(validationMessage).toContain('Where-Klausel');
        });

        it('should identify a broken condition', function () {
            let invalidQuery = "SELECT * FROM board1 WHERE color = blue;"
            let validationMessage = executeSql(invalidQuery, [], []);
            expect(validationMessage).toContain('Abfragebedingung');
        });

        it('should call filterBoard and draw when query is valid', function () {
            let invalidQuery = "SELECT * FROM board1 WHERE color = 'blue';"
            let validationMessage = executeSql(invalidQuery, [], []);
            expect(drawSandboxBoards).toHaveBeenCalled();
            expect(validationMessage).toContain('Super');
        });

    });
})
