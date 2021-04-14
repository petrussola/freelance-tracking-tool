/* eslint-disable no-undef */

beforeEach(() => {
  cy.visit("/");
});

describe("Loads home page", () => {
  it("Succesfully loads", () => {
    cy.contains("Start");
    cy.contains("Create Task");
    cy.contains("History");
  });
  it("Shows task name input", () => {
    cy.contains("Save Name");
    cy.get("input").should("be.visible");
  });
  it("Displays Pause and Stop buttons when start is clicked", () => {
    cy.get("[data-cy=start-pause-button]").click();
    cy.contains("Pause");
    cy.contains("Stop");
    cy.contains("Loading");
  });
});
