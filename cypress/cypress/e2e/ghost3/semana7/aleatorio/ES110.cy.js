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
    _siteObject = new Site("ES109");
    _siteObject.given_user_visit_ghost();

    _loginObject = new Login("ES109");
    _loginObject.when_user_enter_credentials_and_click_on_login();
  });

  it("Create new page menu en la navegacion principal", () => {
    menuObject = new Menu("ES109");
    _pageObject = new Page("ES109");
    _configObject = new Config("ES109");

    menuObject.when_user_navigate_to_config();
    _configObject.when_user_create_new_menu_onsecondary_navigation_long_title_random();
    _configObject.then_the_menu_was_created();
  });

});