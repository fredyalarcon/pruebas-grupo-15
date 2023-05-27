import { Login } from "../page-object/login/login";
import { Menu } from "../page-object/menu/menu";
import { Site } from "../page-object/site/site";
import { Page } from "../page-object/page/page";
import { Config } from "../page-object/config/config"

describe("Testion new menus", () => {
  let _siteObject;
  let _loginObject;
  let _pageObject;
  let menuObject;
  let _configObject;
  beforeEach(()=>{
    // GIVEN: usuario autenticado y navego hasta pages
    _siteObject = new Site("ES112");
    _siteObject.given_user_visit_ghost();

    _loginObject = new Login("ES112");
    _loginObject.when_user_enter_credentials_and_click_on_login();
  });

  it("Create new page menu en la navegacion principal", () => {
    menuObject = new Menu("ES112");
    _pageObject = new Page("ES112");
    _configObject = new Config("ES112");

    menuObject.when_user_navigate_to_config();
    _configObject.when_user_create_new_menu_onsecondary_navigation_empty_title();
    _configObject.then_the_secondary_menu_was_not_created();
  });

});