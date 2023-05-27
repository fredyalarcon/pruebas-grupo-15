import { Login } from "../page-object/login/login";
import { Site } from "../page-object/site/site";
import { Menu } from "../page-object/menu/menu";
import { Tag } from "../page-object/tag/tag";

const datatitle = require("./data/title_and_description.json");
const dataanytext = require("./data/any_text.json");

describe("Crear tag con url con caracteres especiales en la opción meta data ", () => {
  let _siteObject = new Site('ES053');
  let _loginObject = new Login('ES053');
  let _tagObject = new Tag();
  let menuObject = new Menu('ES053');

  let index = _tagObject.getIndexRandom(1, 1000);
  const Tag1 = datatitle[index].title;
  const urlCanonical = dataanytext[index].cualquier_texto;

  it("Test Crear tag con url con caracteres especiales en la opción meta data", () => {
    // GIVEN: usuario autenticado
    _siteObject.given_user_visit_ghost();
    _loginObject.when_user_enter_credentials_and_click_on_login();

    // WHEN: usuario navega a la pantalla tag
    menuObject.when_user_navigate_to_tags();
    // AND: usuario da click en el boton new tag
    _tagObject.when_user_click_on_new_tag();
    // AND: usuario ingresa el nombre del tag
    _tagObject.when_user_name_tag(Tag1);
    // AND: usuario selecciona meta data
    _tagObject.when_user_meta_data();
    // AND: usuario ingresa la url meta data del tag
    _tagObject.when_user_canonical_tag(urlCanonical);
    // AND: usuario guarda tag
    _tagObject.when_user_save_tag ();
     // THEN: valida boton retry
     _tagObject.then_valida_boton_retry();

  });
    
});