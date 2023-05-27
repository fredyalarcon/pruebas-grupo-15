import { Login } from "../login/login";
import { Site } from "../site/site";
import { Menu } from "../menu/menu";
import { Staff } from "./staff";

describe('Testing General settings', () => {
  let _siteObject;
  let _loginObject;
  let _staffObject;
  let _menuObject;

  beforeEach(() => {
    _siteObject = new Site('ES018');
    _loginObject = new Login('ES018');
    _staffObject = new Staff('ES018');
    _menuObject = new Menu('ES018');

    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })
  })

  afterEach(() => {
    _staffObject.when_user_type_old_fullname();
    _staffObject.when_user_save_settings_after();
  })

  it("Test modify profile", () => {
    // GIVEN: usuario autenticado
    _siteObject.given_user_visit_ghost();
    _loginObject.when_user_enter_credentials_and_click_on_login();

    // WHEN: usuario click en el profile dropdown
    _menuObject.when_user_expand_profile();
    // AND: click en el profile
    _menuObject.when_user_click_profile();
    // AND: usuario borra e ingresa el nuevo nombre
    _staffObject.when_user_type_new_fullname();
    // AND: usuario guarda las configuraciones
    _staffObject.when_user_save_settings();

    // THEN: el cambio fue guardado
    _staffObject.then_save_settings();
    _menuObject.when_user_expand_profile();
    //_staffObject.then_save_settings_new_full_name();
  });
});