const { wait } = require('@testing-library/user-event/dist/utils');
const { verify } = require('crypto');

describe('Auth', function () {
  describe('LoginForm', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000');
    });
    it('login to application', function () {
      cy.get('[data-testid=login-menu-item]').click();
      cy.get('[data-testid=username-input]').type('test');
      cy.get('[data-testid=password-input]').type('test');
      cy.get('[data-testid=login-submit]').click();
      expect(cy.get('[data-testid=author-table-body]')).to.exist;
      expect(cy.get('[data-testid=author-edit-form]')).to.exist;
    });
    it('login fails with wrong password', function () {
      //print an error message
    });
    it('login fails with wrong username', function () {
      //print an error message
    });

    it.only('login should redirect when user is logged in already', function () {
      cy.get('[data-testid=login-menu-item]').click();
      cy.get('[data-testid=username-input]').type('test');
      cy.get('[data-testid=password-input]').type('test');
      cy.get('[data-testid=login-submit]').click();
      cy.wait(1000);
      expect(cy.get('[data-testid=author-table-body]')).to.exist;
      expect(cy.get('[data-testid=author-edit-form]')).to.exist;
      cy.visit('http://localhost:3000/login');
      cy.wait(1000);
      expect(cy.get('[data-testid=author-table-body]')).to.exist;
      expect(cy.get('[data-testid=author-edit-form]')).to.exist;
    });
    // });
  });
});
