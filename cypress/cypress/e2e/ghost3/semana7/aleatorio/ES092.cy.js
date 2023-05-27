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
    _siteObject = new Site("ES092");
    _siteObject.given_user_visit_ghost();

    _loginObject = new Login("ES092");
    _loginObject.when_user_enter_credentials_and_click_on_login();

    menuObject = new Menu("ES092");
    menuObject.when_user_navigate_to_pages();
  });
  

  it("Test create new page", () => {
    // WHEN: usuario da click en el boton new page
    _pageObject = new Page("ES092");
    _pageObject.when_user_click_on_new_page();
    // AND: usuario ingresa el titulo y contenido de la pagina
    _pageObject.when_user_type_title_and_content_random();
    // AND: usuario publica el pagina
    _pageObject.when_user_publish_page();

    
    // THEN: la pagina fue publicado
    _pageObject.then_page_was_published();
    
  });

});