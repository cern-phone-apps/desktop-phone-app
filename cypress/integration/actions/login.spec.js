context("Login Actions Tests", () => {
  it("click on login button redirects to redirect page", () => {
    cy.visit("/login");
    cy.get(".LoginButton").click();
    cy.url().should("be", "http://localhost:3000/");
    // cy.get('h1').should('contain', 'Welcome to the Dashboard')

    // and our cookie should be set to 'cypress-session-cookie'
    // cy.getCookie("csrf_access_token").should("exist");
  });

  it("CSRF Token must exist after login", () => {
    cy.loginBySingleSignOn().then(resp => {
      // yup this should all be good
      expect(resp.status).to.eq(200);

      // we're at http://localhost:7074/dashboard contents
      cy.log(`resp.body`);
      cy.log(resp.body);
      expect(resp.body.login).to.equals(true);
      cy.getCookie("csrf_access_token").should("exist");
      cy.getCookie("csrf_refresh_token").should("exist");
    });

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

  it("should display main screen after login", () => {
    // cy.visit("/login");
    // cy.get(".segment > .ui").click();
    // cy.url().should('include', '/login');
    // cy.get('h1').should('contain', 'Welcome to the Dashboard')
    // cy.loginBySingleSignOn().then(resp => {
    //   // yup this should all be good
    //   expect(resp.status).to.eq(200);
    //
    //   // we're at http://localhost:7074/dashboard contents
    //   cy.visit('/');
    //   cy.url().should("be", "http://localhost:3000/");
    //   // cy.log(cy.log("div"));
    //   cy.get("div").should("contain", "Select a phone number");
    // });
    cy.visit("/login");
    cy.get(".LoginButton").click();
    cy.url().should("be", "http://localhost:3000/");
    cy.get("div").should("contain", "Select a phone number");
  });
});
