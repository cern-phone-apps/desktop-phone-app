context("Receive Call Actions Tests", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get(".LoginButton").click();
    cy.get(".ConnectNumberButton")
      .first()
      .click();
    cy.get(".LeftColumn .sidebar.icon").click();
    cy.get(".SidebarDebugButton").click();
    cy.get(".ReceiveCallDebugButton").click();
  });

  it("should contain receive call modal elements", () => {
    cy.contains("Receiving an incoming call");
    cy.contains("Reject");
    cy.contains("Answer");
  });

  it("should reject a call", () => {
    cy.get(".RejectCallButton").click();
    cy.get(".CallingModal").should("not.be.visible");
  });

  it("should answer a call", () => {
    cy.get(".AnswerCallButton").click();
    cy.get(".CallingModal").should("not.be.visible");
  });

  it("should hide the calling modal", () => {
    cy.get(".CallingModal > i.close.icon").click();
    cy.get(".CallingModal").should("not.be.visible");
    cy.get(".CallingMessage").should("be.visible");
  });

  it("should make visible the calling modal", () => {
    cy.get(".CallingModal > i.close.icon").click();
    cy.get(".CallingModal").should("not.be.visible");
    cy.get(".CallingMessage").should("be.visible");
    cy.wait(1000);
    cy.get(".CallingMessage").click({ force: true });
    cy.get(".CallingModal").should("be.visible");
    cy.get(".CallingMessage").should("not.be.visible");
  });
});
