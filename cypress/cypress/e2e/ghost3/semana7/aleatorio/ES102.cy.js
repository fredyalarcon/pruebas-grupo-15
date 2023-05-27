import { Login } from "../page-object/login/login";
import { Menu } from "../page-object/menu/menu";
import { Site } from "../page-object/site/site";
import { Page } from "../page-object/page/page";


describe("Testing page creation", () => {
  let _siteObject;
  let _loginObject;
  let _pageObject;
  let menuObject;
  beforeEach(()=>{
    // GIVEN: usuario autenticado y navego hasta pages
    _siteObject = new Site("ES101");
    _siteObject.given_user_visit_ghost();

    _loginObject = new Login("ES101");
    _loginObject.when_user_enter_credentials_and_click_on_login();

    menuObject = new Menu("ES101");
    menuObject.when_user_navigate_to_pages();
  });
  

  it("Test create new page", () => {
    // WHEN: usuario da click en el boton new page
    _pageObject = new Page("ES101");
    _pageObject.when_user_click_on_new_page();
    // AND: usuario ingresa el titulo de la pagina
    _pageObject.when_user_type_title_random();
    // AND: usuario crea una url
    _pageObject.when_user_click_on_add_url();
    // AND: usuario escribe una url
    _pageObject.when_user_type_url_random();

    
    // THEN: la url no es valida
    _pageObject.then_check_random_ulr();
    
  });

});