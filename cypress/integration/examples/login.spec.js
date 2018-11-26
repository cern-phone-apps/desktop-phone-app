const _ = Cypress._;

context("Login Tests", () => {
  Cypress.Commands.add("loginBySingleSignOn", (overrides = {}) => {
    Cypress.log({
      name: "loginBySingleSignOn"
    });

    const options = {
      method: "POST",
      url: "http://localhost:7075/auth/v1/login",
      qs: {
        // use qs to set query string to the url that creates
        // http://auth.corp.com:8080?redirectTo=http://localhost:7074/set_token
        redirectTo: "http://localhost:3000/redirect/"
      }
    };

    // allow us to override defaults with passed in overrides
    _.extend(options, overrides);

    cy.request(options);
  });

  beforeEach(function() {
    cy.clearCookies();
  });

  it("should redirect to login when not logged in", () => {
    cy.visit("/");
    cy.url().should("include", "/login");
    // cy.get('h1').should('contain', 'Welcome to the Dashboard')

    // and our cookie should be set to 'cypress-session-cookie'
    // cy.getCookie("csrf_access_token").should("exist");
  });

  it("click on login button redirects", () => {
    cy.visit("/login");
    cy.get(".segment > .ui").click();
    // cy.url().should('include', '/login');
    // cy.get('h1').should('contain', 'Welcome to the Dashboard')

    // and our cookie should be set to 'cypress-session-cookie'
    // cy.getCookie("csrf_access_token").should("exist");
  });

  it("CSRF Token must exist after login", () => {
    // cy.visit("/login");
    // cy.get(".segment > .ui").click();
    // cy.url().should('include', '/login');
    // cy.get('h1').should('contain', 'Welcome to the Dashboard')
    cy.log("created new user");
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
});
