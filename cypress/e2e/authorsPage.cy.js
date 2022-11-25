/// <reference types="cypress" />
/// <reference types="../support" />
import { AuthorsPage } from '../components';

describe('authors page', () => {
  beforeEach(function () {
    cy.login({ username: 'test', password: 'test' });
    cy.seedTestDatabase();
    cy.visit('http://localhost:3000');
  });
  it('table should have 5 rows ', function () {
    cy.testIdStarts(AuthorsPage.authorRow).should('have.length', 5);
  });
  describe('edit author', function () {
    it('should compare table and select options and values have to be same ', function () {
      cy.intercept('POST', 'http://localhost:4000', function (req) {
        if (req.body.operationName === 'editAuthor') {
          req.alias = 'editAuthor';
          req.continue();
        }
      });
      cy.intercept('POST', 'http://localhost:4000', function (req) {
        if (req.body.operationName === 'allAuthors') {
          req.alias = 'allAuthors';
          req.continue();
        }
      });
      cy.getByTestId(AuthorsPage.getAuthorRow(3)).within(() => {
        cy.get('td').eq(1).should('have.value', '');
      });
      cy.get('.react-select__control').click();
      cy.get('#react-select-2-option-3').click();
      cy.getByTestId(AuthorsPage.bornInput).type(1954);
      cy.getByTestId(AuthorsPage.editForm).submit();
      cy.wait('@editAuthor');
      cy.wait('@allAuthors');
      cy.getByTestId(AuthorsPage.getAuthorRow(3)).within(() => {
        cy.get('td').eq(1).contains(1954);
      });
    });
    it.only('amount should be 4 characters long', function () {
      cy.getByTestId(AuthorsPage.bornInput).type(194);
      cy.getByTestId(AuthorsPage.editForm).submit();
      cy.getByTestId(AuthorsPage.editForm).contains('Must be 4 characters long');
    });
  });
});
