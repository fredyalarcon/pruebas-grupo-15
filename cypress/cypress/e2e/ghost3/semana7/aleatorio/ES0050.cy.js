import { Login } from "../page-object/login/login";
import { Site } from "../page-object/site/site";
import { Menu } from "../page-object/menu/menu";
import { Tag } from "../page-object/tag/tag";
import { faker } from '@faker-js/faker';

describe("Crear tag y modificar color  ", () => {
  let _siteObject = new Site('ES046');
  let _loginObject = new Login('ES046');
  let _tagObject = new Tag();
  let menuObject = new Menu('ES046');

  let Tag1 = faker.lorem.sentence().substring(0, 10).trim();
  let desc = faker.lorem.sentence().substring(0, 50);
  let slug = faker.lorem.slug();
  let color = faker.internet.color();
  let color2 = faker.internet.color();

  it("Test Crear tag y modificar color ", () => {
    // GIVEN: usuario autenticado
    _siteObject.given_user_visit_ghost();
    _loginObject.when_user_enter_credentials_and_click_on_login();

    // WHEN: usuario navega a la pantalla tag
    menuObject.when_user_navigate_to_tags();
    // AND: usuario da click en el boton new tag
    _tagObject.when_user_click_on_new_tag();
    // AND: usuario ingresa el nombre del tag
    _tagObject.when_user_name_tag(Tag1);
    // AND: usuario ingresa el slug del tag
    _tagObject.when_user_slug_tag(slug);
    // AND: usuario ingresa el color del tag
    _tagObject.when_user_color_tag(color.substring(1,7));
    // AND: usuario ingresa el descripción del tag
    _tagObject.when_user_description_tag(desc);
    // AND: usuario guarda tag
    _tagObject.when_user_save_tag ();
    // THEN: valida título tag
    _tagObject.then_valida_titulo_tag(Tag1);

     // WHEN: usuario toma el valor de slug del tag
     _tagObject.when_retorna_slug ().then((value) => {
      // WHEN: usuario navega a la pantalla tag
      menuObject.when_user_navigate_to_tags();
      // WHEN: usuario busca de la lista el tag creado
      _tagObject.when_click_list_tag(value, Tag1);
      // AND: usuario limpia color del tag
    _tagObject.When_clear_color();

    // AND: usuario modifica el color del tag
    _tagObject.when_user_color_tag(color2.substring(1,7));
    // AND: usuario guarda tag
    _tagObject.when_user_save_tag ();
    // THEN: valida título tag
    _tagObject.then_valida_colot_tag(color2.substring(1,7)); 

    _tagObject.when_retorna_slug ().then((value) => {
      // WHEN: usuario navega a la pantalla tag
      menuObject.when_user_navigate_to_tags();
      // WHEN: usuario busca de la lista el tag creado
      _tagObject.when_click_list_tag(value, Tag1);

      // AND: usuario limpia nombre del tag
      _tagObject.when_user_delete_current_tag();
      // WHEN: usuario busca el elemento borrado en la lista
      _tagObject.then_list_tag(value, Tag1);
    });

    });

  });
    
});