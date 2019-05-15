context("Search Actions Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get(".LoginButton").click();
    cy.get(".ConnectNumberButton")
      .first()
      .click();
    cy.get("input").type("Test");
  });

  it("should make user profile visible", () => {
    cy.get('.UserSearchResult').first().click();
    cy.get('.UserProfile').should("be.visible");
  });

  // it("makes a call from user profile", () => {
  //   cy.get('.UserSearchResult').first().click();
  //   cy.get('.CalleeProfileNumber').first().click();
  //   // cy.get('.UserProfile').should("be.visible");
  // });

  it("makes a call from user profile", () => {
    cy.get('.UserSearchResult').first().click();
    cy.get('.CalleeProfileNumber').first().click();
    cy.get('.OutgoingCallModal').should("be.visible");
    cy.contains('On call with');
  });



  //
  // it("should contain recent calls", () => {
  //   cy.get('.UserProfile').should("be.visible");
  // });
  //
  // it("should have Search and Dialpad", () => {
  //   cy.contains('Search');
  //   cy.contains('Dialpad');
  // });

  // it("hides the select phone number modal", () => {
  //   cy.visit("/login");
  //   cy.get(".LoginButton").click();
  //   cy.get(".ConnectNumberButton")
  //     .first()
  //     .click();
  //   cy.get(".SelectPhoneModal").should("not.be.visible");
  // });
});
