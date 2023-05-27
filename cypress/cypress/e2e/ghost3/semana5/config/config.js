export class Config {
    scenario = ''

    constructor(scenario = '') {
        this.scenario = scenario;
    }
    
    when_user_create_new_menu_on_primary_navigation = (url) => {
        cy.get('input[placeholder="Label"]').last().type("Nueva Pagina")
        cy.wait(100)
        cy.get('input.ember-text-field').first().type("nueva-pagina")
        cy.wait(500)
        cy.get('button.gh-btn-blue').click();
        cy.screenshot(`${this.scenario}/create_primary_menu`);
        
    };

    when_user_create_new_menu_onsecondary_navigation = (url) => {
        cy.get('input[placeholder="Label"]').last().type("Nueva Pagina")
        cy.wait(100)
        cy.get('input.ember-text-field').last().type("nueva-pagina")
        cy.wait(500)
        cy.get('button.gh-btn-blue').click();
        
        cy.screenshot(`${this.scenario}/create_second_menu`);
    };
    
    then_the_menu_was_created = () => {
        cy.get('button.gh-btn-green').should('exist');
        cy.screenshot(`${this.scenario}/menu_created`);   
        //document.querySelector(" div.site-nav-right")
        
    };
    
  }
  