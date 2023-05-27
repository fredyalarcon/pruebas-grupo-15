import { Menu } from "../menu/menu";
import { Site } from "../site/site";
import { Login } from "./login";

describe("Testing Ghost authentication", () => {
  let _siteObject = new Site('ES002');
  let _loginObject = new Login('ES002');
  let menuObject = new Menu('ES002');

  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })
  })

  it("test successful login", () => {
    // GIVEN: usuario que ingreso al enlace del sitio de ghost
    _siteObject.given_user_visit_ghost();
    _loginObject.when_user_enter_credentials_and_click_on_login();

    // WHEN: usuario click en el profile dropdown
    menuObject.when_user_expand_profile();
    // AND: click en logout
    menuObject.when_user_logout();

    // THEN: usuario es redireccionado al login page
    _siteObject.then_user_is_redirected_to_site_login();
  });
});
