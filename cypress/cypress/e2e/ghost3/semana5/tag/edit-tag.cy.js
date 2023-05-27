import { Login } from "../login/login";
import { Menu } from "../menu/menu";
import { Site } from "../site/site";
import { Tag } from "./tag";

describe("Testing edit tag", () => {
  let _siteObject = new Site("http://localhost:2368/ghost/#/signin");
  let _loginObject = new Login();
  let _tagObject = new Tag();
  let menuObject = new Menu();
  let edslut = '';
  const Tag2 = "Cypress tag ghost 2";
  const Tag3 = "Cypress tag ghost 3";

  it("Test edit tag", () => {
    // GIVEN: usuario autenticado
    _siteObject.given_user_visit_ghost();
    _loginObject.when_user_enter_credentials_and_click_on_login();

    // WHEN: usuario navega a la pantalla tag
    menuObject.when_user_navigate_to_tags();
    // AND: usuario da click en el boton new tag
    _tagObject.when_user_click_on_new_tag();
    // AND: usuario ingresa el nombre del tag
    _tagObject.when_user_name_tag(Tag2);
    // AND: usuario guarda tag
    _tagObject.when_user_save_tag ();

    
    // THEN: valida título tag
    _tagObject.then_valida_titulo_tag(Tag2);
    // WHEN: usuario toma el valor de slug del tag
    _tagObject.when_retorna_slug ().then((value) => {
      // WHEN: usuario navega a la pantalla tag
      menuObject.when_user_navigate_to_tags();
      // WHEN: usuario busca de la lista el tag creado
      _tagObject.when_click_list_tag(value, Tag2);
    });
    // AND: usuario limpia nombre del tag
    _tagObject.When_clear_name();

    // AND: usuario ingresa el nuevo nombre del tag
    _tagObject.when_user_name_tag(Tag3);
    // AND: usuario guarda tag
    _tagObject.when_user_save_tag ();
    // THEN: valida título tag
    _tagObject.then_valida_titulo_tag(Tag3); 

    _tagObject.when_retorna_slug ().then((value) => {
      // WHEN: usuario navega a la pantalla tag
      menuObject.when_user_navigate_to_tags();
      // WHEN: usuario busca de la lista el tag creado
      _tagObject.when_click_list_tag(value, Tag3);

      // AND: usuario limpia nombre del tag
      _tagObject.when_user_delete_current_tag();
      // WHEN: usuario busca el elemento borrado en la lista
      _tagObject.then_list_tag(value, Tag3);
    });
  });
});