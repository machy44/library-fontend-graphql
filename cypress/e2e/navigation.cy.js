/// <reference types="cypress" />
/// <reference types="../support" />
import { Navigation } from '../components';

describe('navigation', function () {
  describe('logged out state', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
    it('should have only books and authors and login', () => {
      cy.getByTestId(Navigation.authorsItem).should('exist');
      cy.getByTestId(Navigation.booksItem).should('exist');
      cy.getByTestId(Navigation.loginItem).should('exist');
      cy.getByTestId(Navigation.addBookItem).should('not.exist');
      cy.getByTestId(Navigation.recommendItem).should('not.exist');
      cy.getByTestId(Navigation.logoutItem).should('not.exist');
    });
  });
  describe('login state', () => {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'test' });
      cy.seedTestDatabase();
      cy.visit('http://localhost:3000');
    });
    it('should have logout, addBook, RecommendBooks', () => {
      cy.getByTestId(Navigation.authorsItem).should('exist');
      cy.getByTestId(Navigation.booksItem).should('exist');
      cy.getByTestId(Navigation.loginItem).should('not.exist');
      cy.getByTestId(Navigation.addBookItem).should('exist');
      cy.getByTestId(Navigation.recommendItem).should('exist');
      cy.getByTestId(Navigation.logoutItem).should('exist');
    });
  });
});
