import { Site } from "../page-object/site/site";
import { Login } from "../page-object/login/login";

describe("Testing Ghost authentication credentials invalid and then credentials valid!", () => {
  let _siteObject = new Site('ES003');
  let _loginObject = new Login('ES003');

  it("test invalid login and valid login", () => {
    // GIVEN: usuario que ingreso al enlace del sitio de ghost
    _siteObject.given_user_visit_ghost();
    
    // WHEN: usuario ingresa credenciales invalidas y da click en el boton login
    _loginObject.when_user_enter_invalid_credentials_and_click_on_login_faker();
    
    // THEN: usuario es redireccionado al panel del sitio y se muestra el titulo del sitio
    _loginObject.then_show_invalid_message_and_show_retry();

    // WHEN: usuario ingresa credenciales y da click en el boton login
    _loginObject.when_user_enter_credentials_and_click_on_login();

    // THEN: usuario es redireccionado al panel del sitio y se muestra el titulo del sitio
    _siteObject.then_user_is_redirected_to_site_portal();
  });
});
