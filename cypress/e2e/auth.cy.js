import { LoginForm, Navigation, AuthorsPage } from '../components';

describe('Auth', function () {
  describe('LoginForm', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000');
    });
    it('login to application', function () {
      cy.getByTestId(Navigation.loginItem).click();
      cy.getByTestId(LoginForm.usernameInput).type('test');
      cy.getByTestId(LoginForm.passwordInput).type('test');
      cy.getByTestId(LoginForm.submit).click();
      expect(cy.getByTestId(AuthorsPage.tableBody)).to.exist;
      expect(cy.getByTestId(AuthorsPage.editForm)).to.exist;
    });
    it('login fails with wrong password', function () {
      cy.get('[data-testid=login-menu-item]').click();
      cy.get('[data-testid=username-input]').type('test');
      cy.get('[data-testid=password-input]').type('wrong');
      cy.get('[data-testid=login-submit]').click();
    });
    it('login fails with wrong username', function () {
      cy.get('[data-testid=login-menu-item]').click();
      cy.get('[data-testid=username-input]').type('wrong');
      cy.get('[data-testid=password-input]').type('test');
      cy.get('[data-testid=login-submit]').click();
    });

    it.only('login should redirect when user is logged in already', function () {
      cy.getByTestId(Navigation.loginItem).click();
      cy.getByTestId(LoginForm.usernameInput).type('test');
      cy.getByTestId(LoginForm.passwordInput).type('test');
      cy.getByTestId(LoginForm.submit).click();
      cy.wait(1000);
      expect(cy.getByTestId(AuthorsPage.tableBody)).to.exist;
      expect(cy.getByTestId(AuthorsPage.editForm)).to.exist;
      cy.visit('http://localhost:3000/login');
      cy.wait(1000);
      expect(cy.getByTestId(AuthorsPage.tableBody)).to.exist;
      expect(cy.getByTestId(AuthorsPage.editForm)).to.exist;
    });
    // });
  });
});
