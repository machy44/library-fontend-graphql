describe('new book form', function () {
  it('should open new book form ', function () {
    cy.visit('http://localhost:3000/add');
    cy.contains('create book');
  });
  describe('should not submit ', function () {
    it('title is empty', function () {});
    it('author is empty', function () {});
    it('published is empty ', function () {});
    it('genres is empty', function () {});
  });
  describe('should submit ', function () {
    it('when all required fields have values', function () {});
  });
});
