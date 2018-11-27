context("Connected Screen Elements Tests", () => {

  beforeEach(()=> {
    cy.visit("/login");
    cy.get(".LoginButton").click();
    cy.get(".ConnectNumberButton")
      .first()
      .click();
  });

  it("should display de user search field", () => {
    cy.get(".UserSearchInput").should("be.visible");

  });

  it("should display grren connected icon", () => {
    cy.get('.green.icon').should("be.visible");
  });

  it("should contain recent calls", () => {
    cy.get('.LeftColumn > .ScrollableContent').should("be.visible");
  });

  it("should have Search and Dialpad", () => {
    cy.contains('Search');
    cy.contains('Dialpad');
  });

  // it("hides the select phone number modal", () => {
  //   cy.visit("/login");
  //   cy.get(".LoginButton").click();
  //   cy.get(".ConnectNumberButton")
  //     .first()
  //     .click();
  //   cy.get(".SelectPhoneModal").should("not.be.visible");
  // });
});
