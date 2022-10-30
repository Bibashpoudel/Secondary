describe('My First Test', () => {
  it('Visits the bibash Sink', () => {
    cy.visit('https://example.cypress.io');

    cy.contains('type').click();
  });
});
