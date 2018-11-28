context("Dialpad Actions Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get(".LoginButton").click();
    cy.get(".ConnectNumberButton")
      .first()
      .click();
  });

  it("should display dialpad", () => {
    cy.get(".DisplayDialpadButton").click();
    cy.get(".Dialpad").should("be.visible");
    cy.get(".DialpadInput").should("be.visible");
  });

  it("should handle dialpad button click", () => {
    cy.get(".DisplayDialpadButton").click();
    cy.get('.DialButton').first().click();
    cy.get('.DialButton').eq(1).click();
    cy.get('.DialButton').eq(2).click();
    cy.get('.DialButton').eq(3).click();
    cy.get(".DialpadInput>input[type='text']").should("have.value", "1234");
  });

  it("makes a call from dialpad", () => {
    cy.get('.DisplayDialpadButton').first().click();
    cy.get('.DialButton').first().click();
    cy.get('.DialButton').eq(1).click();
    cy.get('.DialButton').eq(2).click();
    cy.get('.DialButton').eq(3).click();
    cy.get('.CallButton').click();
    cy.get('.OutgoingCallModal').should("be.visible");
    cy.contains('On call with');
  });
  //
  // it("should have search button enabled after input", () => {
  //   cy.get("input").type("Test");
  //   cy.get(".SearchUserButton").should("not.have.class", "disabled");
  // });
  //
  // it("should make search results visible", () => {
  //   cy.get("input").type("Test");
  //   cy.get(".UserSearchResultsList").should("be.visible");
  // });
  //
  // it("should search after click on search button", () => {
  //   cy.get("input").type("Test");
  //   cy.get(".SearchUserButton").click();
  //   cy.get(".UserSearchResultsList").should("be.visible");
  // });

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
