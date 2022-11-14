describe('Auth', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/login');
  });

  describe('LoginForm', function () {
    it('login to application', function () {
      cy.contains('Notes');
      cy.contains('Note app, Department of Computer Science, University of Helsinki 2022');
    });
    it('login should redirect when user is logged in already', function () {
      cy.contains('Notes');
      cy.contains('Note app, Department of Computer Science, University of Helsinki 2022');
    });
  });
});
