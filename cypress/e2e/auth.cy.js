describe('Auth', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000');
  });

  describe('LoginForm', function () {
    it('login to application', function () {
      cy.get('[data-testid=login-menu-item]').click();
      cy.get('[data-testid=username-input]').type('test');
      cy.get('[data-testid=password-input]').type('test');
      cy.get('[data-testid=login-submit]').click();
      cy.contains('authors');
    });
    it('login should redirect when user is logged in already', function () {
      // create login command
      cy.contains('Notes');
      cy.contains('Note app, Department of Computer Science, University of Helsinki 2022');
    });
  });
});
