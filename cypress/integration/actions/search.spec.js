context("Search Actions Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get(".LoginButton").click();
    cy.get(".ConnectNumberButton")
      .first()
      .click();
  });

  it("should have search button disabled", () => {
    cy.get(".SearchUserButton").should("have.class", "disabled");
  });

  it("should have search button enabled after input", () => {
    cy.get("input").type("Test");
    cy.get(".SearchUserButton").should("not.have.class", "disabled");
  });

  it("should make search results visible", () => {
    cy.get("input").type("Test");
    cy.get(".UserSearchResultsList").should("be.visible");
  });

  it("should search after click on search button", () => {
    cy.get("input").type("Test");
    cy.get(".SearchUserButton").click();
    cy.get(".UserSearchResultsList").should("be.visible");
  });

  //
  // it("should contain recent calls", () => {
  //   cy.get('.LeftColumn > .ScrollableContent').should("be.visible");
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
