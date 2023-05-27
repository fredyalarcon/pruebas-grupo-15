//Estrategia a priori
const dataBlank = require("../../a-priori/data/field_blank.json");
const dataTitleAndDescription = require("../../a-priori/data/title_and_description.json");
const any_text = require("../../a-priori/data/any_text.json");

import { faker } from "@faker-js/faker";

export class Config {
    scenario = ''

    constructor(scenario = '') {
        this.scenario = scenario;
    }
    
    when_user_create_new_menu_on_primary_navigation_a_priory = () => {
        let index = this.getIndexRandom(1, 1000);
        cy.get('input[placeholder="Label"]').first().clear()
        cy.get('input.ember-text-field').eq(1).clear()
        cy.get('input[placeholder="Label"]').first().type(dataTitleAndDescription[index].title)
        cy.wait(100)
        cy.get('input.ember-text-field').eq(1).type(dataTitleAndDescription[index].title.replace(/\s+/g, ''))
        cy.wait(500)
        cy.get('button.gh-btn-blue').click();
        
    };

    when_user_create_new_menu_on_primary_navigation_random = () => {
        let tittle = faker.lorem.words(1);
        cy.get('input[placeholder="Label"]').first().clear()
        cy.get('input.ember-text-field').eq(1).clear()
        cy.get('input[placeholder="Label"]').first().type(tittle)
        cy.wait(100)
        cy.get('input.ember-text-field').eq(1).type(tittle)
        cy.wait(500)
        cy.get('button.gh-btn-blue').click();
        
    };

    when_user_create_new_menu_onsecondary_navigation_a_priory = () => {
        let index = this.getIndexRandom(1, 1000);
        cy.get('input[placeholder="Label"]').last().type(dataTitleAndDescription[index].title)
        cy.wait(100)
        cy.get('input.ember-text-field').last().type(dataTitleAndDescription[index].title.replace(/\s+/g, ''))
        cy.wait(500)
        cy.get('button.gh-btn-blue').click();
    
    };

    when_user_create_new_menu_onsecondary_navigation_random = () => {
        let title = faker.lorem.words(1);
        cy.get('input[placeholder="Label"]').last().type(title)
        cy.wait(100)
        cy.get('input.ember-text-field').last().type(title)
        cy.wait(500)
        cy.get('button.gh-btn-blue').click();
    };

    when_user_create_new_menu_on_primary_navigation_long_title_random = () => {
        let title = faker.lorem.words(1);
        let title_long = faker.lorem.words(25);
        cy.get('input[placeholder="Label"]').first().clear()
        cy.get('input.ember-text-field').eq(1).clear()
        cy.get('input[placeholder="Label"]').first().type(title_long)
        cy.wait(100)
        cy.get('input.ember-text-field').eq(1).type(title)
        cy.wait(500)
        cy.get('button.gh-btn-blue').click();
    };

    when_user_create_new_menu_onsecondary_navigation_long_title_random = () => {
        let title = faker.lorem.words(1);
        let title_long = faker.lorem.words(25);
        cy.get('input[placeholder="Label"]').last().type(title_long)
        cy.wait(100)
        cy.get('input.ember-text-field').last().type(title)
        cy.wait(500)
        cy.get('button.gh-btn-blue').click();
    };

    when_user_create_new_menu_on_primary_navigation_empty_title = () => {
        cy.get('input[placeholder="Label"]').first().clear()
        cy.get('input.ember-text-field').eq(1).clear()
        cy.get('input[placeholder="Label"]').first().type(dataBlank[1].field_blank)
        cy.wait(100)
        cy.get('button.gh-btn-blue').click();
    };

    when_user_create_new_menu_onsecondary_navigation_empty_title = () => {
        cy.get('form[id="secondary-navigation"] > div > div > div > div > span > input[placeholder="Label"]').first().clear()
        cy.get('form[id="secondary-navigation"] > div > div > div > div > span > input.ember-text-field').eq(1).clear()

        cy.get('form[id="secondary-navigation"] > div > div > div > div > span > input[placeholder="Label"]').first().type(dataBlank[1].field_blank)
        
        cy.wait(100)
        cy.get('button.gh-btn-blue').click();
    };
    
    then_the_menu_was_created = () => {
        cy.get('button.gh-btn-green').should('exist');
        cy.screenshot(`${this.scenario}/menu_created`);   
        
    };

    then_the_menu_was_not_created = () => {
        cy.get('button.gh-btn-red').should('exist'); 
        
    };

    then_the_secondary_menu_was_not_created = () => {
        cy.contains('p.response', 'You must specify a label')
        .should('exist'); 
        
    };
    
    getIndexRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
  }
  