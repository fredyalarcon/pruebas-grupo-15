
const _url = "http://localhost:2368/ghost/#/signin";

export class Site {

  scenario = ''

  constructor(scenario = '') { 
    this.scenario = scenario;
  }
  
  given_user_visit_ghost = () => {
    cy.visit(_url);
    cy.wait(2000);
  }
  
  then_user_is_redirected_to_site_portal = () => {
    cy.wait(2000);
    cy.window().then((win) => {
      expect(win.document.location.href).to.include("/ghost/#/");
    });
    /*cy.get(".gh-nav-menu-details-blog").then(($header) => {
      expect($header).not.to.be.undefined
    });*/
  };

  then_user_is_redirected_to_site_login = () => {
    cy.wait(2000);
    cy.window().then((win) => {
      expect(win.document.location.href).to.include("/ghost/#/signin");
    });
  };
}
