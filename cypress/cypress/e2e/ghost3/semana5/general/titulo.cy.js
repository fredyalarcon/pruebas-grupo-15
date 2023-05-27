import { Login } from "../login/login";
import { Site } from "../site/site";
import { Menu } from "../menu/menu";
import { General } from "./general";

describe('Testing General settings', () => {
  let _siteObject = new Site();
  let _loginObject = new Login();
  let _generalObject = new General();
  let _menuObject = new Menu();

  afterEach(() => {
    _generalObject.when_user_reset_title_and_descripcion();
    _generalObject.when_user_save_settings();
  })

  it("Test Title & description", () => {
    // GIVEN: usuario autenticado
    _siteObject.given_user_visit_ghost();
    _loginObject.when_user_enter_credentials_and_click_on_login();

    // WHEN: usuario navega a la pantalla setting/General
    _menuObject.when_user_navigate_to_general();
    // AND: usuario da click en el boton expand del titulo y la descripción
    _generalObject.when_user_click_on_expand_title_and_description();
    // AND: usuario ingresa el titulo y descripcion del blog
    _generalObject.when_user_type_title_and_descripcion();
    // AND: usuario guarda las configuraciones
    _generalObject.when_user_save_settings();

    // THEN: el cambio fue guardado
    _generalObject.then_title_was_updated();
  });
});