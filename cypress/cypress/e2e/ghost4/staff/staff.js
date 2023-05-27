
export class Staff {

  oldFullName = "";
  newFullName = "New FullName";

  get userNameField() {
    return cy.get("#user-name");
  }

  get saveButton() {
    return cy.get(".gh-canvas-header-content > .view-actions > button");
  }

  scenario = ''
  
  constructor(scenario = '') { 
    this.scenario = scenario;
  }

  when_user_click_on_first_user = () => {
    cy.get(".apps-grid-cell.tooltip-centered > a").then((buttons) => {
      buttons[0].click();
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/click_on_first_user`);
  };

  when_user_type_new_fullname = () => {
    cy.wait(2000);
    cy.window().then((win) => {
      this.oldFullName = win.document.querySelector("#user-name").value;
    });
    this.userNameField.clear().type(this.newFullName, { force: true });
    cy.wait(500);
    cy.screenshot(`${this.scenario}/type_new_fullname`);
  };

  when_user_type_old_fullname = () => {
    this.userNameField.clear().type(this.oldFullName, { force: true });
    cy.wait(500);
    cy.screenshot(`${this.scenario}/type_old_fullname`);
  };

  when_user_save_settings = () => {
    this.saveButton.click();
    cy.wait(100);
    cy.screenshot(`${this.scenario}/save_settings`);
  };

  then_save_settings = () => {
    cy.get(".gh-canvas-header-content > .view-actions > button").then(($title) => {
      expect($title[0].innerText).to.equal("Saved");
    });

    cy.get('.gh-canvas-title').should('include.text',this.newFullName);
    cy.wait(500);
    cy.screenshot(`${this.scenario}/then_save_settings`);
  };

  when_user_save_settings_after = () => {
    this.saveButton.click();
    cy.wait(100);
    cy.screenshot(`${this.scenario}/save_settings_after`);
  };
}
