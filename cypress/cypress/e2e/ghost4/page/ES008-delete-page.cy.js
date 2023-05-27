import { Login } from "../login/login";
import { Menu } from "../menu/menu";
import { Site } from "../site/site";
import { Page } from "./page";


describe("Testing page creation", () => {
  let _siteObject;
  let _loginObject;
  let _pageObject;
  let menuObject;
  beforeEach(()=>{
    // GIVEN: usuario autenticado y navego hasta pages
    _siteObject = new Site("ES008");
    _siteObject.given_user_visit_ghost();

    _loginObject = new Login("ES008");
    _loginObject.when_user_enter_credentials_and_click_on_login();

    menuObject = new Menu("ES008");
    menuObject.when_user_navigate_to_pages();
  });
  
  it("Test delete page", ()=>{
    // WHEN: usuario da click en eliminar pagina
    _pageObject = new Page("ES008");
    _pageObject.when_user_click_on_delete_page();
    //THEN: la pagina fue eliminada
    _pageObject.then_page_was_deleted();
   
 })


});
