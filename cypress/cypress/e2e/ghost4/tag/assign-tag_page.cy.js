import { Login } from "../login/login";
import { Menu } from "../menu/menu";
import { Site } from "../site/site";
import { Tag } from "./tag";
import { PageTag } from "./pagetag";

describe("Testing assign tag to page", () => {
  let _siteObject = new Site("http://localhost:2368/ghost/#/signin");
  let _loginObject = new Login();
  let _tagObject = new Tag();
  let menuObject = new Menu();
  let _pageObject = new PageTag();
  let edslut = '';
  const tagPage = "Cypress tag page";
  const namePage = "page tag";

  it("Testing assign tag to page", () => {
    // GIVEN: usuario autenticado
    _siteObject.given_user_visit_ghost();
    _loginObject.when_user_enter_credentials_and_click_on_login();

    // WHEN: usuario navega a la pantalla tag
    menuObject.when_user_navigate_to_tags();
    // AND: usuario da click en el boton new tag
    _tagObject.when_user_click_on_new_tag();
    // AND: usuario ingresa el nombre del tag
    _tagObject.when_user_name_tag(tagPage);
    // AND: usuario guarda tag
    _tagObject.when_user_save_tag ();    
    // THEN: valida título tag
    _tagObject.then_valida_titulo_tag(tagPage);

    // AND: usuario navega a la pantalla pages
    menuObject.when_user_navigate_to_pages();
    // AND: usuario da click en el boton new page
    _pageObject.when_user_click_on_new_page(); 
    // AND: usuario ingresa el titulo y contenido de la page
    _pageObject.when_user_type_title_and_content(namePage);
    // AND: usuario publica page
    _pageObject.when_user_publish_page();

    // WHEN: usuario navega al listado de pages
    _pageObject.when_user_click_on_go_back_to_pages();
    // AND: click en el primer post de la lista, ultimo creado
    _pageObject.when_user_click_on_lastest_page();
    // AND: asigna tag al post
    _tagObject.when_user_assign_tag_post(tagPage);
    // AND: usuario publica el post
    _pageObject.when_user_publish_page();

    // THEN: el page fue editado
    _pageObject.then_page_was_Edited();
    // AND: go back
    _pageObject.when_user_click_on_go_back_to_pages();
    // AND: latest pages was edited:
    _tagObject.then_latest_page_was_edited(namePage);

  });
});