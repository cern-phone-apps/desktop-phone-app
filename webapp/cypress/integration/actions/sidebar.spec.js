context("Sidebar Actions Tests", () => {

  beforeEach(()=> {
    cy.visit("/login");
    cy.get(".LoginButton").click();
    cy.get(".ConnectNumberButton")
      .first()
      .click();
  });

  it("display sidebar hamburger button", () => {
    cy.get(".sidebar.icon").should("be.visible");

  });

  it("handle click on sidebar button", () => {
    cy.get(".LeftColumn .sidebar.icon").click();
  });

  it("should make debug modal visible on debug button click", () => {
    cy.get(".LeftColumn .sidebar.icon").click();
    cy.get(".SidebarDebugButton").click();
    cy.get(".ModalDebug").should("be.visible");
  });

  it("should make debug modal not visible after clicking on close button", () => {
    cy.get(".LeftColumn .sidebar.icon").click();
    cy.get(".SidebarDebugButton").click();
    cy.get(".ModalDebug").should("be.visible");
    cy.get(".ModalDebug > i.close.icon").click();
    cy.get(".ModalDebug").should("not.be.visible");

  });

  it("should make settings modal visible on settings button click", () => {
    cy.get(".LeftColumn .sidebar.icon").click();
    cy.get(".SidebarSettingsButton").click();
    cy.get(".ModalSettings").should("be.visible");
  });

  it("should make settings modal not visible after clicking on close button", () => {
    cy.get(".LeftColumn .sidebar.icon").click();
    cy.get(".SidebarSettingsButton").click();
    cy.get(".ModalSettings > i.close.icon").click();
    cy.get(".ModalSettings").should("not.be.visible");
  });

  it("should take the user to the calls route", () => {
    cy.get(".LeftColumn .sidebar.icon").click();
    cy.get(".Sidebar_calls").click();
    cy.url().should("be", "http://localhost:3000/");
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
