context("Home", () => {
  // beforeEach(() => {
  //   cy.visit("https://dial-next.web.cern.ch");
  // });

  // https://on.cypress.io/interacting-with-elements
s
  it("redirects to login if not logged in", () => {
    cy.visit("https://localhost:3000");
    cy.url().should('include', '/login');
  });

});
