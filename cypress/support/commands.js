/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('createBook', ({ title, author, published, genre }) => {
  cy.get('[data-testid="title"]').type(title);
  cy.get('[data-testid="author"]').type(author);
  cy.get('[data-testid="published"]').type(published);
  cy.get('[data-testid="genre"]').type(genre);
  cy.get('[data-testid="add-genre-button"]').click();
  cy.get('[data-testid="genres"]').contains(genre);
  cy.get('[data-testid="create-book-submit"]').click();
});

Cypress.Commands.add('editAuthor', function ({ name, born }) {
  cy.get('[data-testid="name"]').type(name);
  cy.get('[data-testid="born"]').type(born);
  cy.get('[data-testid="update-author-submit"]').click();
});

Cypress.Commands.add('getByTestId', function (selector, ...args) {
  return cy.get(`[data-testid=${selector}]`, ...args);
});

Cypress.Commands.add('testIdStarts', function (selector, ...args) {
  return cy.get(`[data-testid^=${selector}]`, ...args);
});
