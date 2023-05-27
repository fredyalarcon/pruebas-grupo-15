//Estrategia a priori
const dataColours = require("../../a-priori/data/colour.json");
//Estrategia aleatorio
import {faker} from '@faker-js/faker'

export class CodeInjection {
  oldStyle = "";

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

  when_user_type_header_and_footer = () => {
    let index = this.getIndexRandom(1, 1000);
    cy.get('.CodeMirror-code > div > .CodeMirror-line > span').invoke('text')
      .then(text => {
        const colour = dataColours[index].color;
        const newText = '<style>.site-title {color: '+colour+';}</style>';
        cy.wrap(newText)
          .then(newText => {
            cy.get('.CodeMirror-code > div > .CodeMirror-line > span')
              .invoke('text', newText); // Establecer el nuevo texto
          });
      });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_header_and_footer`);
  }; 

  when_user_save_settings = () => {
    this.saveButton.click();
    cy.screenshot(`${this.scenario}/save_settings`);
  };

  then_save_settings = () => {
    cy.get('.view-actions > .gh-btn.gh-btn-blue.gh-btn-icon.ember-view > span').then(($title) => {
      expect($title[0].innerText).to.equal("Saved");
    });
    cy.wait(2000);
    cy.screenshot(`${this.scenario}/then_save_settings`);
  };

  when_user_type_header_and_footer_faker = () => {
    cy.get('.CodeMirror-code > div > .CodeMirror-line > span').invoke('text')
      .then(text => {
        const colour = faker.color.rgb();
        const newText = '<style>.site-title {color: '+colour+';}</style>';
        cy.wrap(newText)
          .then(newText => {
            cy.get('.CodeMirror-code > div > .CodeMirror-line > span')
              .invoke('text', newText); // Establecer el nuevo texto
          });
      });
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/type_header_and_footer`);
  }; 

}