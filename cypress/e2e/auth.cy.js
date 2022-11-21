import { wait } from '@testing-library/user-event/dist/utils';
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
      cy.getByTestId(Navigation.loginItem).click();
      cy.getByTestId(LoginForm.usernameInput).type('test');
      cy.getByTestId(LoginForm.passwordInput).type('wrong');
      cy.getByTestId(LoginForm.submit).click();
      cy.contains('wrong credentials');
    });
    it('login fails with wrong username', function () {
      cy.getByTestId(Navigation.loginItem).click();
      cy.getByTestId(LoginForm.usernameInput).type('wrong');
      cy.getByTestId(LoginForm.passwordInput).type('test');
      cy.getByTestId(LoginForm.submit).click();
      cy.contains('wrong credentials');
    });

    it('login should redirect when user is logged in already', function () {
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
