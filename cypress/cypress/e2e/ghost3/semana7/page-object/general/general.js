//Estrategia a priori
const dataBlank = require("../../a-priori/data/field_blank.json");
const dataTitleAndDescription = require("../../a-priori/data/title_and_description.json");
const dataUserNameFacebook = require("../../a-priori/data/username_facebook.json");
const dataUserNameTwitter = require("../../a-priori/data/username_twitter.json");
//Estrategia aleatorio
import { faker } from '@faker-js/faker'

export class General {
  oldTitle = "";
  newTitle = "";

  oldDescription = "";
  newDescription = "";

  oldFanPage = "";
  newFanPage = "";

  oldPageTwitter = "";
  newPageTwitter = "";

  get saveButton() {
    return cy.get(".gh-canvas-header > .view-actions > button");
  }

  scenario = ''

  constructor(scenario = '') {
    this.scenario = scenario;
  }

  getIndexRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
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

  when_user_type_title_and_descripcion_blank = () => {
    cy.window().then((win) => {
      this.oldTitle = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[0].value;
    });
    cy.get(
      ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
    ).then(($inputs) => {
      cy.wrap($inputs[0]).clear();
    });

    cy.window().then((win) => {
      this.oldDescription = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[1].value;
    });
    cy.get(
      ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
    ).then(($inputs) => {
      cy.wrap($inputs[1]).clear();
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_title_and_descripcion`);
  };

  when_user_type_title_and_descripcion = () => {
    let index = this.getIndexRandom(1, 1000);
    cy.window().then((win) => {
      this.oldTitle = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[0].value;
    });
    cy.get(
      ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
    ).then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(dataTitleAndDescription[index].title, { force: true });
    });
    cy.window().then((win) => {
      this.newTitle = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[0].value;
    });

    cy.window().then((win) => {
      this.oldDescription = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[1].value;
    });
    cy.get(
      ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
    ).then(($inputs) => {
      cy.wrap($inputs[1]).clear().type(dataTitleAndDescription[index].description, { force: true });
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

  when_user_type_only_title = () => {
    let index = this.getIndexRandom(1, 1000);
    cy.window().then((win) => {
      this.oldTitle = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[0].value;
    });
    cy.get(
      ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
    ).then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(dataTitleAndDescription[index].title, { force: true });
    });
    cy.window().then((win) => {
      this.newTitle = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[0].value;
    });

    cy.window().then((win) => {
      this.oldDescription = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[1].value;
    });
    cy.get(
      ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
    ).then(($inputs) => {
      cy.wrap($inputs[1]).clear();
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_title_and_descripcion`);
  };

  when_user_type_only_description = () => {
    let index = this.getIndexRandom(1, 1000);
    cy.window().then((win) => {
      this.oldTitle = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[0].value;
    });
    cy.get(
      ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
    ).then(($inputs) => {
      cy.wrap($inputs[0]).clear();
    });
    cy.window().then((win) => {
      this.newTitle = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[0].value;
    });

    cy.window().then((win) => {
      this.oldDescription = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[1].value;
    });
    cy.get(
      ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
    ).then(($inputs) => {
      cy.wrap($inputs[1]).clear().type(dataTitleAndDescription[index].description, { force: true });
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_title_and_descripcion`);
  };

  when_user_type_only_title_faker = () => {
    cy.window().then((win) => {
      this.oldTitle = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[0].value;
    });
    cy.window().then((win) => {
      this.oldDescription = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[1].value;
    });

    cy.get(
      ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
    ).then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(faker.commerce.department(), { force: true });
    });
    cy.window().then((win) => {
      this.newTitle = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[0].value;
    });

    cy.get(
      ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
    ).then(($inputs) => {
      cy.wrap($inputs[1]).clear();
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_title_and_descripcion`);
  };

  when_user_type_only_description_faker = () => {
    cy.window().then((win) => {
      this.oldTitle = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[0].value;
    });
    cy.window().then((win) => {
      this.oldDescription = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[1].value;
    });
    cy.get(
      ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
    ).then(($inputs) => {
      cy.wrap($inputs[0]).clear();
    });
    cy.window().then((win) => {
      this.newTitle = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[0].value;
    });
    cy.get(
      ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
    ).then(($inputs) => {
      cy.wrap($inputs[1]).clear().type(faker.commerce.productDescription(), { force: true });
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_title_and_descripcion`);
  };

  when_user_type_title_and_descripcion_faker = () => {
    cy.window().then((win) => {
      this.oldTitle = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[0].value;
    });
    cy.window().then((win) => {
      this.oldDescription = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[1].value;
    });
    cy.get(
      ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
    ).then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(faker.commerce.department(), { force: true });
    });
    cy.window().then((win) => {
      this.newTitle = win.document.querySelectorAll(
        ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
      )[0].value;
    });
    cy.get(
      ".gh-setting-content-extended > .form-group.ember-view > .ember-text-field.gh-input.ember-view"
    ).then(($inputs) => {
      cy.wrap($inputs[1]).clear().type(faker.commerce.productDescription(), { force: true });
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_title_and_descripcion`);
  };

  when_user_click_on_expand_social_account = () => {
    cy.get(".gh-setting-action > button").then(
      (buttons) => {
        buttons[9].click();
      }
    );
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/click_on_expand_social_account`);
  };

  when_user_type_fan_page_facebook = () => {
    let index = this.getIndexRandom(1, 1000);
    cy.window().then((win) => {
      this.oldFanPage = win.document.querySelectorAll('.form-group.ember-view > input')[0].value
    });
    cy.get('.form-group.ember-view > input').then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(dataUserNameFacebook[index].profile_facebook, { force: true });
    });
    cy.window().then((win) => {
      this.newFanPage = win.document.querySelectorAll('.form-group.ember-view > input')[0].value;
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_fan_page_facebook`);
  };

  when_user_reset_fan_page = () => {
    cy.get('.form-group.ember-view > input').then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(this.oldFanPage, { force: true });
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/reset_fan_page`);
  };

  when_user_type_fan_page_facebook_faker = () => {
    let urlBase = 'https://www.facebook.com/';
    cy.window().then((win) => {
      this.oldFanPage = win.document.querySelectorAll('.form-group.ember-view > input')[0].value
    });
    cy.get('.form-group.ember-view > input').then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(urlBase+faker.lorem.slug(), { force: true });
    });
    cy.window().then((win) => {
      this.newFanPage = win.document.querySelectorAll('.form-group.ember-view > input')[0].value;
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_fan_page_facebook`);
  };

  when_user_type_page_twitter = () => {
    let index = this.getIndexRandom(1, 1000);
    cy.window().then((win) => {
      this.oldPageTwitter = win.document.querySelectorAll('.form-group.ember-view > input')[1].value
    });
    cy.get('.form-group.ember-view > input').then(($inputs) => {
      cy.wrap($inputs[1]).clear().type(dataUserNameTwitter[index].profile_twitter, { force: true });
    });
    cy.window().then((win) => {
      this.newPageTwitter = win.document.querySelectorAll('.form-group.ember-view > input')[1].value;
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_fan_page_facebook`);
  };

  when_user_reset_page_twitter = () => {
    cy.get('.form-group.ember-view > input').then(($inputs) => {
      cy.wrap($inputs[1]).clear().type(this.oldPageTwitter, { force: true });
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/reset_page_twitter`);
  };

  when_user_type_page_twitter_faker = () => {
    let urlBase = 'https://twitter.com/';
    cy.window().then((win) => {
      this.oldPageTwitter = win.document.querySelectorAll('.form-group.ember-view > input')[1].value
    });
    cy.get('.form-group.ember-view > input').then(($inputs) => {
      cy.wrap($inputs[1]).clear().type(urlBase+faker.internet.userName(), { force: true });
    });
    cy.window().then((win) => {
      this.newPageTwitter = win.document.querySelectorAll('.form-group.ember-view > input')[1].value;
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_fan_page_facebook`);
  };

  when_user_type_page_twitter_faker_negativo = () => {
    let urlBase = 'https://twitter.com/';
    cy.window().then((win) => {
      this.oldPageTwitter = win.document.querySelectorAll('.form-group.ember-view > input')[1].value
    });
    cy.get('.form-group.ember-view > input').then(($inputs) => {
      cy.wrap($inputs[1]).clear().type(urlBase+faker.lorem.slug(), { force: true });
    });
    cy.window().then((win) => {
      this.newPageTwitter = win.document.querySelectorAll('.form-group.ember-view > input')[1].value;
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_fan_page_facebook`);
  };

}
