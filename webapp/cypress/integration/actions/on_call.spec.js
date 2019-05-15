context("On Call Actions Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get(".LoginButton").click();
    cy.get(".ConnectNumberButton")
      .first()
      .click();
    cy.get("input").type("Test");
    cy.get('.UserSearchResult').first().click();
    cy.get('.CalleeProfileNumber').first().click();
  });

  it("has buttons and texts", () => {
    cy.get('.OutgoingCallModal').should("be.visible");
    cy.contains('On call with');
    cy.get('.OnCallDetails__HangupButton').should("be.visible");
    cy.get('.Dialpad').should("be.visible");
  });

  it("hangs up a call", () => {
    cy.get('.OutgoingCallModal').should("be.visible");
    cy.get('.OnCallDetails__HangupButton').click();
  });

  it("adds a recent call after hang up", () => {
    cy.get('.OutgoingCallModal').should("be.visible");
    cy.get('.OnCallDetails__HangupButton').click();
    cy.get('.RecentCall').should("be.visible");
    cy.get('.RecentCall').should('have.length', 1)

  });
});
