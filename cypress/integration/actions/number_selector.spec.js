context("Number Selector Actions Tests", () => {
  it("click on login button redirects to redirect page", () => {
    cy.visit("/login");
    cy.get(".LoginButton").click();
    cy.get(".ConnectNumberButton")
      .first()
      .click();
  });

  it("hides the select phone number modal", () => {
    cy.visit("/login");
    cy.get(".LoginButton").click();
    cy.get(".ConnectNumberButton")
      .first()
      .click();
    cy.get(".SelectPhoneModal").should("not.be.visible");
  });
});
