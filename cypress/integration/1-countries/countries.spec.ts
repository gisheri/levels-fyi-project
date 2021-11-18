/// <reference types="cypress" />


describe( "Test Countries List", () => {
  it("Should search countries according to input", () => {
    cy.visit('localhost:3000/countries');
    cy.get('[data-cy=country-search]').type('al');
    cy.get('table').contains('Albania').should("exist");
    cy.get('table').contains('Algeria').should("exist");
    cy.get('table').contains('Afghanistan').should("not.exist");
  })
})

export {}