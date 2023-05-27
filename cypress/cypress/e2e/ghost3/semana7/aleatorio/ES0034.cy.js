import { Login } from "../page-object/login/login";
import { Site } from "../page-object/site/site";
import { Menu } from "../page-object/menu/menu";
import { Tag } from "../page-object/tag/tag";
import { faker } from '@faker-js/faker';


describe("Crear tag título con 191 caracteres  ", () => {
  let _siteObject = new Site('ES034');
  let _loginObject = new Login('ES034');
  let _tagObject = new Tag();
  let menuObject = new Menu('ES034');

  let Tag1 = '';
  while (Tag1.length < 192) {
    Tag1 += faker.random.arrayElement(faker.random.alpha().toUpperCase());
  }
  Tag1 = Tag1.toLowerCase().substring(0, 191);

  it("Test Crear tag título con 191 caracteres", () => {
    // GIVEN: usuario autenticado
    _siteObject.given_user_visit_ghost();
    _loginObject.when_user_enter_credentials_and_click_on_login();

    // WHEN: usuario navega a la pantalla tag
    menuObject.when_user_navigate_to_tags();
    // AND: usuario da click en el boton new tag
    _tagObject.when_user_click_on_new_tag();
    // AND: usuario ingresa el nombre del tag
    _tagObject.when_user_name_tag(Tag1);
    // AND: usuario guarda tag
    _tagObject.when_user_save_tag ();
    // THEN: valida título tag
    _tagObject.then_valida_titulo_tag(Tag1);

  });
    
});