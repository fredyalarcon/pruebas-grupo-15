import { Login } from "../login/login";
import { Site } from "../site/site";
import { Menu } from "../menu/menu";
import { General } from "./general";

describe('template spec', () => {
  let _siteObject = new Site();
  let _loginObject = new Login();
  let _generalObject = new General();
  let _menuObject = new Menu();

  it("Test Title & description", () => {
    // GIVEN: usuario autenticado
    _siteObject.given_user_visit_ghost();
    _loginObject.when_user_enter_credentials_and_click_on_login();

    // WHEN: usuario navega a la pantalla setting/General
    _menuObject.when_user_navigate_to_general();
    // AND: usuario da click en el boton delete y luego sube el nuevo logo
    _generalObject.when_user_click_on_delete_logo();
    _generalObject.when_user_click_on_upload_image_background();
    // AND: usuario guarda las configuraciones
    _generalObject.when_user_save_settings();

    // THEN: el post fue publicado
    _menuObject.when_user_navigate_to_site();
    //_generalObject.then_imagen_background_was_updated();

  });
})