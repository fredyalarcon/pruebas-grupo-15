export class General {
  oldTitle = "";
  newTitle = "Nuevo Título";

  oldDescription = "";
  newDescription = "Nuevo Descripción";

  get saveButton() {
    return cy.get(".gh-canvas-header > .view-actions > button");
  }

  scenario = ''

  constructor(scenario = '') { 
    this.scenario = scenario;
  }

  when_user_click_on_expand_title_and_description = () => {
    cy.get(".gh-setting-action > button").then(
      (buttons) => {
        buttons[0].click();
      }
    );
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/click_on_expand_title_and_description`);
  };

  when_user_type_title_and_descripcion = () => {
    cy.window().then((win) => {
      this.oldTitle = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[0].value;
    });
    cy.get(
      ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
    ).then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(this.newTitle, { force: true });
    });

    cy.window().then((win) => {
      this.oldDescription = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[1].value;
    });
    cy.get(
      ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
    ).then(($inputs) => {
      cy.wrap($inputs[1]).clear().type(this.newDescription, { force: true });
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_title_and_descripcion`);
  };

  when_user_reset_title_and_descripcion = () => {
    cy.get(
      ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
    ).then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(this.oldTitle, { force: true });
    });

    cy.get(
      ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
    ).then(($inputs) => {
      cy.wrap($inputs[1]).clear().type(this.oldDescription, { force: true });
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/reset_title_and_descripcion`);
  };

  when_user_save_settings = () => {
    this.saveButton.click();
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/save_settings`);
  };

  then_title_was_updated = () => {
    cy.wait(1000);
    cy.get(".gh-nav-menu-details-blog").then(($title) => {
      expect($title[0].innerText).to.equal(this.newTitle);
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/title_was_updated`);
  };

  when_user_click_on_upload_image = () => {
    cy.get('.gh-setting-first > .gh-setting-action > div > span > input[type="file"]')
      .selectFile('cypress/fixtures/kraken-icon.png', { force: true });
    cy.wait(2000);
    cy.screenshot(`${this.scenario}/click_on_upload_image`);
  };

  then_icon_was_updated = () => {
    cy.wait(1000);
    cy.get('.gh-nav-menu-icon').invoke('attr', 'style').then((style) => {
      expect(style).to.include('kraken-icon');
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/icon_was_updated`);
  };

  when_user_click_on_delete_logo = () => {
    cy.get('.gh-setting > .gh-setting-action.gh-setting-action-smallimg > button').click();
    cy.wait(500);
    cy.screenshot(`${this.scenario}/delete_logo`);
  };

  when_user_click_on_upload_image_background = () => {
    cy.get('.gh-setting-last > .gh-setting-action > div > span > input[type="file"]')
      .selectFile('cypress/fixtures/fondo.jpg', { force: true });
    cy.wait(2000);
    cy.screenshot(`${this.scenario}/upload_image_background`);
  };

  then_imagen_background_was_updated = () => {
    cy.wait(2000);
    cy.get('.site-home-header style').invoke('text').then((style) => {
      expect(style).to.include('fondo');
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/imagen_background_was_updated`);
  };

  //AFTER
  when_user_save_settings_after = () => {
    this.saveButton.click();
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/save_settings_after`);
  };
}
