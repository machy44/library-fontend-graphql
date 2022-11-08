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

      const newBook = {
        title: 'title',
        author: 'author',
        published: 1234,
        genre: 'punk',
      };

      cy.createBook(newBook);
      cy.get('[data-testid="create-book-submit"]').click();
      cy.wait('@createBook').then((interception) => {
        expect(interception.request.body.variables.author).to.equal(newBook.author);
        expect(interception.request.body.variables.title).to.equal(newBook.title);
        expect(interception.request.body.variables.published).to.equal(newBook.published);
        expect(interception.request.body.variables.genres).to.have.all.members([newBook.genre]);
      });
    });
  });
  describe('check cache after book creation', function () {
    it('all authors should be up to date', function () {
      const newBook = {
        title: 'pero je gazda',
        author: 'pero deformero',
        published: '1954',
        genre: 'drama',
      };
      cy.createBook(newBook);
      cy.get('[data-testid=authors-menu-item]').click();
      cy.contains(newBook.author);
    });
    it('all books should be up to date', function () {
      const newBook = {
        title: 'pero je gazda',
        author: 'pero deformero',
        published: '1954',
        genre: 'drama',
      };
      cy.createBook(newBook);
      cy.get('[data-testid=books-menu-item]').click();
      cy.contains(newBook.title);
    });
  });
});
