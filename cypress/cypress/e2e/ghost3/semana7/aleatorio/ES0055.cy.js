import { Login } from "../page-object/login/login";
import { Site } from "../page-object/site/site";
import { Menu } from "../page-object/menu/menu";
import { Tag } from "../page-object/tag/tag";
import { faker } from '@faker-js/faker';

describe("Crear tag con meta-title con más de 70 caracteres en la opción meta data ", () => {
  let _siteObject = new Site('ES055');
  let _loginObject = new Login('ES055');
  let _tagObject = new Tag();
  let menuObject = new Menu('ES055');

  const Tag1 = faker.lorem.sentence().substring(0, 10).trim();
  const urlCanonical = faker.internet.url();
  const metaTitle = faker.lorem.sentence(100).substring(0, 71);

  it("Test Crear tag con meta-title con más de 70 caracteres en la opción meta data ", () => {
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
    // AND: usuario ingresa el meta title del tag
    _tagObject.when_user_metatitle_tag(metaTitle)
    // AND: usuario guarda tag
    _tagObject.when_user_save_tag ();
     // THEN: valida boton retry
     _tagObject.then_valida_cont_meta_tlite();

     // THEN: valida título tag
    _tagObject.then_valida_titulo_tag(Tag1);

    // WHEN: usuario toma el valor de slug del tag
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