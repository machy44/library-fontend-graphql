/// <reference types="Cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Get one or more DOM elements by node data-testid
     * @param {string} testid - data-testid to find
     * @example
     *    cy.testId('my-test-id').should('be.disabled')
     */
    getByTestId(testid: string): Cypress.Chainable<JQuery>;
    /**
     * Get one or more DOM elements by node's starting data-testid.
     * So cy.testIdStarts("foo") matches "foo-bar"
     * @param {string} testid - data-testid to find
     * @example
     *    cy.testIdStarts('my-test-id').should('be.disabled')
     */
    testIdStarts(testid: string): Cypress.Chainable<JQuery>;
  }
}
