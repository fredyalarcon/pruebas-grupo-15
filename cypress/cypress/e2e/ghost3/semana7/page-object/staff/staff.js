//Estrategia a priori
const dataFullName = require("../../a-priori/data/full_name_person.json");
const dataSlug = require("../../a-priori/data/username.json");
const dataFacebook = require("../../a-priori/data/username_facebook.json");
const dataTwitter = require("../../a-priori/data/username_twitter.json");
const dataLongText = require("../../a-priori/data/long_text.json");
const dataCountry = require("../../a-priori/data/country.json");
//Estrategia aleatorio
import {faker} from '@faker-js/faker'
export class Staff {

  oldFullName = "";
  newFullName = "New FullName";
  oldSlug = "";
  oldFacebook = "";
  oldTwitter = "";
  newBio = "";
  oldBio = "";
  newLocation = "";
  oldLocation = "";

  newLongText = dataLongText[0].long_text;

  get userNameField() {
    return cy.get("#user-name");
  }

  get userSlugField() {
    return cy.get("#user-slug");
  }

  get userFacebookField() {
    return cy.get("#user-facebook");
  }

  get userTwitterField() {
    return cy.get("#user-twitter");
  }

  get userBioField() {
    return cy.get("#user-bio");
  }

  get userLocationField() {
    return cy.get("#user-location");
  }
  
  get saveButton() {
    return cy.get(".gh-canvas-header.gh-canvas-header--sticky > .view-actions > button");
  }

  scenario = ''
  
  constructor(scenario = '') { 
    this.scenario = scenario;
  }

  getIndexRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  when_user_click_on_first_user = () => {
    cy.get(".apps-grid-cell.tooltip-centered > a").then((buttons) => {
      buttons[0].click();
    });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/click_on_first_user`);
  };

  when_user_type_new_fullname = () => {
    let index = this.getIndexRandom(1, 1000);
    cy.wait(1000);
    cy.window().then((win) => {
      this.oldFullName = win.document.querySelectorAll("#user-name")[0].value;
    });

    cy.get("#user-name").then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(dataFullName[index].full_name_person, { force: true });
    });

    cy.wait(1000);
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
    cy.get(".gh-canvas-header.gh-canvas-header--sticky > .view-actions > button").then(($title) => {
      expect($title[0].innerText).to.equal("Saved");
    }); 
    cy.wait(500);
    cy.screenshot(`${this.scenario}/then_save_settings`);
  };

  when_user_save_settings_after = () => {
    this.saveButton.click();
    cy.wait(100);
    cy.screenshot(`${this.scenario}/save_settings_after`);
  };

  when_user_type_new_fullname_faker = () => {
    let index = this.getIndexRandom(1, 1000);
    cy.wait(1000);
    cy.window().then((win) => {
      this.oldFullName = win.document.querySelectorAll("#user-name")[0].value;
    });

    cy.get("#user-name").then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(faker.person.fullName(), { force: true });
    });
    
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_new_fullname`);
  };

  when_user_type_new_slug = () => {
    let index = this.getIndexRandom(1, 1000);
    cy.wait(1000);
    cy.window().then((win) => {
      this.oldSlug = win.document.querySelectorAll("#user-slug")[0].value;
    });

    cy.get("#user-slug").then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(dataSlug[index].username, { force: true });
    });

    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_new_slug`);
  };

  when_user_type_new_slug_faker = () => {
    cy.wait(1000);
    cy.window().then((win) => {
      this.oldSlug = win.document.querySelectorAll("#user-slug")[0].value;
    });

    cy.get("#user-slug").then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(faker.lorem.slug(), { force: true });
    });

    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_new_slug`);
  };

  when_user_type_old_slug = () => {
    this.userSlugField.clear().type(this.oldSlug, { force: true });
    cy.wait(500);
    cy.screenshot(`${this.scenario}/type_old_fullname`);
  };

  when_user_type_new_facebook = () => {
    let index = this.getIndexRandom(1, 1000);
    cy.wait(1000);
    cy.window().then((win) => {
      this.oldFacebook = win.document.querySelectorAll("#user-facebook")[0].value;
    });

    cy.get("#user-facebook").then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(dataFacebook[index].profile_facebook, { force: true });
    });

    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_new_facebook`);
  };

  when_user_type_new_facebook_faker = () => {
    cy.wait(1000);
    let urlBase = 'https://www.facebook.com/';
    cy.window().then((win) => {
      this.oldFacebook = win.document.querySelectorAll("#user-facebook")[0].value;
    });

    cy.get("#user-facebook").then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(urlBase+faker.lorem.slug(), { force: true });
    });

    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_new_facebook`);
  };

  when_user_type_old_facebook = () => {
    this.userFacebookField.clear().type(this.oldFacebook, { force: true });
    cy.wait(500);
    cy.screenshot(`${this.scenario}/type_old_facebook`);
  };

  when_user_type_new_twitter = () => {
    let index = this.getIndexRandom(1, 1000);
    cy.wait(1000);
    cy.window().then((win) => {
      this.oldTwitter = win.document.querySelectorAll("#user-twitter")[0].value;
    });

    cy.get("#user-twitter").then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(dataTwitter[index].profile_twitter, { force: true });
    });

    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_new_twitter`);
  };

  when_user_type_new_twitter_faker = () => {
    cy.wait(1000);
    let urlBase = 'https://twitter.com/';
    cy.window().then((win) => {
      this.oldTwitter = win.document.querySelectorAll("#user-twitter")[0].value;
    });

    cy.get("#user-twitter").then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(urlBase+faker.lorem.slug(), { force: true });
    });

    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_new_twitter`);
  };

  when_user_type_old_twitter = () => {
    this.userTwitterField.clear().type(this.oldTwitter, { force: true });
    cy.wait(500);
    cy.screenshot(`${this.scenario}/type_old_twitter`);
  };

  when_user_type_new_biography = () => {
    while (this.newLongText.length <= 200) {
      this.newLongText += dataLongText[this.getIndexRandom(1, 1000)].long_text;
    }
    cy.wait(1000);
    cy.window().then((win) => {
      this.oldBio = win.document.querySelectorAll("#user-bio")[0].value;
    });
    
    
    cy.get("#user-bio").then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(this.newLongText, { force: true });
    });

    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_new_twitter`);
  };

  when_user_type_old_biography = () => {
    this.userBioField.clear().type(this.oldBio, { force: true });
    cy.wait(500);
    cy.screenshot(`${this.scenario}/type_old_bio`);
  };

  then_save_settings_retry = () => {
    cy.get(".gh-canvas-header.gh-canvas-header--sticky > .view-actions > button").then(($title) => {
      expect($title[0].innerText).to.equal("Retry");
    }); 
    cy.wait(500);
    cy.screenshot(`${this.scenario}/then_save_settings_retry`);
  };

  when_user_type_new_biography_a_priori = () => {
    let index = this.getIndexRandom(1, 1000);
    cy.wait(1000);
    cy.window().then((win) => {
      this.oldBio = win.document.querySelectorAll("#user-bio")[0].value;
    });
    cy.get("#user-bio").then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(dataLongText[index].long_text, { force: true });
    });

    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_new_twitter`);
  };

  when_user_type_new_biography_aleatorio = () => {
    cy.wait(1000);
    cy.window().then((win) => {
      this.oldBio = win.document.querySelectorAll("#user-bio")[0].value;
    });
    cy.get("#user-bio").then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(faker.lorem.word({ length: { min: 10, max: 200 }, strategy: 'fail' }), { force: true });
    });

    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_new_twitter`);
  };

  when_user_type_new_location = () => {
    let index = this.getIndexRandom(1, 200);
    cy.wait(1000);
    cy.window().then((win) => {
      this.oldLocation = win.document.querySelectorAll("#user-location")[0].value;
    });

    cy.get("#user-location").then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(dataCountry[index].location, { force: true });
    });

    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_new_location`);
  };

  when_user_type_new_location_faker = () => {
    let index = this.getIndexRandom(1, 200);
    cy.wait(1000);
    cy.window().then((win) => {
      this.oldLocation = win.document.querySelectorAll("#user-location")[0].value;
    });

    cy.get("#user-location").then(($inputs) => {
      cy.wrap($inputs[0]).clear().type(faker.location.country(), { force: true });
    });

    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_new_location`);
  };

  when_user_type_old_location = () => {
    this.userLocationField.clear().type(this.oldLocation, { force: true });
    cy.wait(500);
    cy.screenshot(`${this.scenario}/type_old_location`);
  };
}
