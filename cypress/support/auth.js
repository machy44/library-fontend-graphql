const login = (username, password) => `mutation {
  login(username: "${username}", password: "${password}") {
    value
  }
}`;

Cypress.Commands.add('login', function ({ username, password }) {
  cy.request({
    method: 'POST',
    url: 'http://localhost:4000',
    body: {
      query: login(username, password),
    },
  }).then(({ body }) => {
    console.log({ body });
    localStorage.setItem('library-user-token', body.data.login.value);
  });
});

Cypress.Commands.add('seedTestDatabase', function () {
  const seedTestDatabase = `mutation {
  seedTestDatabase
}`;
  cy.request({
    method: 'POST',
    url: 'http://localhost:4000',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('library-user-token')}`,
    },
    body: {
      query: seedTestDatabase,
    },
  });
});
