describe('edit author', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000');
  });
  it('should edit author and refresh authors list', function () {
    cy.get('tbody > tr').first().contains('1952');
    cy.editAuthor({ name: 'Robert Martin', born: 1954 });
    cy.get('tbody > tr').first().contains('1954');
  });
});
