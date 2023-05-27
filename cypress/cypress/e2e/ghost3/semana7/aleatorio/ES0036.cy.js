import { Login } from "../page-object/login/login";
import { Site } from "../page-object/site/site";
import { Menu } from "../page-object/menu/menu";
import { Tag } from "../page-object/tag/tag";
import { faker } from '@faker-js/faker';


describe("Crear tag con color hexadecimal ", () => {
  let _siteObject = new Site('ES036');
  let _loginObject = new Login('ES036');
  let _tagObject = new Tag();
  let menuObject = new Menu('ES036');

  let Tag1 = faker.lorem.sentence().substring(0, 10).trim();
  let color = faker.internet.color();

  it("Test Crear tag con color hexadecimal ", () => {
    // GIVEN: usuario autenticado
    _siteObject.given_user_visit_ghost();
    _loginObject.when_user_enter_credentials_and_click_on_login();

    // WHEN: usuario navega a la pantalla tag
    menuObject.when_user_navigate_to_tags();
    // AND: usuario da click en el boton new tag
    _tagObject.when_user_click_on_new_tag();
    // AND: usuario ingresa el nombre del tag
    _tagObject.when_user_name_tag(Tag1);
    // AND: usuario ingresa el color del tag
    _tagObject.when_user_color_tag(color);

    // AND: usuario guarda tag
    _tagObject.when_user_save_tag ();
    // THEN: valida color invalido tag
    _tagObject.then_valida_color_invalido(Tag1);

  });
    
});