describe('new book form', function () {
  beforeEach(function () {
    cy.login({ username: 'test', password: 'test' });
    cy.seedTestDatabase();
    cy.visit('http://localhost:3000/add');
  });
  describe('check cache after book creation', function () {
    it('all authors should be up to date', function () {
      cy.intercept('POST', 'http://localhost:4000', function (req) {
        if (req.body.operationName === 'addBook') {
          req.alias = 'createBook';
          req.continue();
        }
      });
      const newBook = {
        title: 'pero je gazda',
        author: 'pero deformero',
        published: '1954',
        genre: 'drama',
      };
      cy.createBook(newBook);
      cy.wait('@createBook');
      cy.get('[data-testid=authors-menu-item]').click();
      cy.contains(newBook.author);
    });
    it('all books should be up to date', function () {
      cy.intercept('POST', 'http://localhost:4000', function (req) {
        if (req.body.operationName === 'addBook') {
          req.alias = 'createBook';
          req.continue();
        }
      });
      const newBook = {
        title: 'pero je gazda 2',
        author: 'pero deformero 2',
        published: '1954',
        genre: 'drama',
      };
      cy.createBook(newBook);
      cy.wait('@createBook');
      cy.get('[data-testid=books-menu-item]').click();
      cy.contains(newBook.title);
    });
  });
});
