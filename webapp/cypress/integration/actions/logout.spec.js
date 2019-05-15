context("Logout Actions Tests", () => {
  // it("click on logout button redirects to redirect page", () => {
  //   cy.visit("/login");
  //   cy.get(".segment > .ui").click();
  //   cy.url().should('be', 'http://localhost:3000/');
  //   // cy.get('h1').should('contain', 'Welcome to the Dashboard')
  //
  //   // and our cookie should be set to 'cypress-session-cookie'
  //   // cy.getCookie("csrf_access_token").should("exist");
  // });

  it("should logout after clicking in Logout button", () => {
    // cy.visit("/login");
    // cy.get(".segment > .ui").click();
    // cy.url().should('include', '/login');
    // cy.get('h1').should('contain', 'Welcome to the Dashboard')
    // cy.loginBySingleSignOn().then(resp => {
    //   // yup this should all be good
    //   expect(resp.status).to.eq(200);
    //
    //   // we're at http://localhost:7074/dashboard contents
    //   // cy.log(`resp.body`);
    //   // cy.log(resp.body);
    //   cy.contains("Select a phone number");
    //   cy.get(".LogoutButton").click();
    // });
    cy.visit("/login");
    cy.get(".LoginButton").click();
    cy.contains("Select a phone number");
    cy.get(".LogoutButton").click();
    cy.contains("Login");
    // // you don't need to do this next part but
    // // just to prove we can also visit the page in our app
    // cy.visit('/dashboard')
    //
    // cy.get('h1').should('contain', 'Welcome to the Dashboard')
    //
    // // and our cookie should be set to 'cypress-session-cookie'
    // cy.getCookie('cypress-session-cookie').should('exist')
    // and our cookie should be set to 'cypress-session-cookie'
  });
});
