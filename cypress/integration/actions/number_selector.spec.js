context("Number Selector Actions Tests", () => {

  it("hides the select phone number modal", () => {
    cy.visit("/login");
    cy.get(".LoginButton").click();
    cy.get(".ConnectNumberButton")
      .first()
      .click();
    cy.get(".SelectPhoneModal").should("not.be.visible");
  });
});
