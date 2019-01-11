const _ = Cypress._;

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
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