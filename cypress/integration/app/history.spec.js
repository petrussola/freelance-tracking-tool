/* eslint-disable no-undef */

beforeEach(() => {
  cy.visit("/history");
});

describe("Loads history page", () => {
  it("Succesfully loads", () => {
    cy.contains("Filter");
    cy.contains("Back Home Page");
  });
});
