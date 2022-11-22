describe('authors page', () =>
  describe('edit author', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000');
    });

    // shoulkd compare table and select options and they have to be same
    // edit author should work
    // table should be updated when author year is changed
    // amount should be number testcase when you put text in input field
    it('update authors birth year', function () {
      cy.get('tbody > tr').first().contains('1952');
      cy.editAuthor({ name: 'Robert Martin', born: 1954 });
      cy.get('tbody > tr').first().contains('1954');
    });
  }));
