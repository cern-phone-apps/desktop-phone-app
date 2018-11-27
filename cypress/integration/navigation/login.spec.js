context("Login Navigation Tests", () => {
  it("should redirect to login screen when not logged in", () => {
    cy.visit("/");
    cy.url().should("include", "/login");
    // cy.get('h1').should('contain', 'Welcome to the Dashboard')
  });

  it("should redirect to home screen when logged in", () => {
    cy.visit("/login");
    cy.get(".LoginButton").click();
    cy.visit("/login");
    cy.url().should("be", "http://localhost:3000/");
    // cy.loginBySingleSignOn().then(resp => {
    //   cy.visit("/login");
    //   cy.url().should("be", "http://localhost:3000/");
    //   cy.contains('Select a phone number')
    // });
  });
});
