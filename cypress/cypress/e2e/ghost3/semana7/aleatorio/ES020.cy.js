import { Login } from "../page-object/login/login";
import { Site } from "../page-object/site/site";
import { Menu } from "../page-object/menu/menu";
import { CodeInjection } from "../page-object/code-injection/code-injection";

describe('Testing General settings', () => {
  let _siteObject = new Site('ES020');
  let _generalObject = new CodeInjection('ES020');
  let _loginObject = new Login('ES020');
  let _menuObject = new Menu('ES020');


  beforeEach(() => {
    _siteObject;
    _loginObject;
    _generalObject
    _menuObject;

    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
  })

  it("Test Style header and footer", () => {
    // GIVEN: usuario autenticado
    _siteObject.given_user_visit_ghost();
    _loginObject.when_user_enter_credentials_and_click_on_login();

    // WHEN: usuario navega a la pantalla setting/General
    _menuObject.when_user_navigate_to_code_injection();
    // AND: usuario ingresa el estilo para header y el footer
    _generalObject.when_user_type_header_and_footer_faker();
    // AND: usuario guarda las configuraciones
    _generalObject.when_user_save_settings();

    // THEN: el cambio fue guardado
    _generalObject.then_save_settings();
    _menuObject.when_user_navigate_to_site();
  });
});