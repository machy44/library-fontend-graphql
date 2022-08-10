describe('new book form', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/add');
  });
  it('should open new book form ', function () {
    cy.contains('create book');
  });
  describe('should not submit ', function () {
    it('title is empty', function () {
      cy.get('input:first').type('mluukkai');
    });
    it('author is empty', function () {});
    it('published is empty ', function () {});
    it('genres is empty', function () {});
  });
  describe('should submit ', function () {
    it('when all required fields have values', function () {
      cy.intercept(
        {
          method: 'POST',
        },
        [],
      ).as('createBook');
      cy.get('[data-testid="title"]').type('title');
      cy.get('[data-testid="author"]').type('author');
      cy.get('[data-testid="published"]').type('1234');
      cy.get('[data-testid="genre"]').type('genre');
      cy.get('[data-testid="add-genre-button"]').click();
      cy.get('[data-testid="genres"]').contains('genre');
      cy.get('[data-testid="create-book-submit"]').click();
      cy.wait('@createBook').then((interception) => {
        expect(interception.request.body.variables.author).to.equal('author');
        expect(interception.request.body.variables.title).to.equal('title');
        expect(interception.request.body.variables.published).to.equal(1234);
        expect(interception.request.body.variables.genres).to.have.all.members(['genre']);
      });
    });
  });
  describe('check cache after book creation', function () {
    it('all books should be up to date', function () {});
    it('all authors should be up to date', function () {});
  });
});
