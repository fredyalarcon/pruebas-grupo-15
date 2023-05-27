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
    _siteObject = new Site("ES098");
    _siteObject.given_user_visit_ghost();

    _loginObject = new Login("ES098");
    _loginObject.when_user_enter_credentials_and_click_on_login();

    menuObject = new Menu("ES098");
    menuObject.when_user_navigate_to_pages();

    _pageObject = new Page("ES098");
    _pageObject.when_user_click_on_new_page();
    _pageObject.when_user_type_title_and_content_random();
    _pageObject.when_user_publish_page();
    _pageObject.when_user_get_back_from_the_page();
  });

  it("Create new page menu en la navegacion secundaria", () => {
    menuObject = new Menu("ES098");
    _pageObject = new Page("ES098");
    _configObject = new Config("ES098");
    
    menuObject.when_user_navigate_to_config();
    _configObject.when_user_create_new_menu_onsecondary_navigation_random();

    _configObject.then_the_menu_was_created();
  });

});