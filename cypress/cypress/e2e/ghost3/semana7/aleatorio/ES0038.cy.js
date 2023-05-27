import { Login } from "../page-object/login/login";
import { Site } from "../page-object/site/site";
import { Menu } from "../page-object/menu/menu";
import { Tag } from "../page-object/tag/tag";
import { faker } from '@faker-js/faker';


describe("Crear tag con slug con más de 186 caracteres  ", () => {
  let _siteObject = new Site('ES038');
  let _loginObject = new Login('ES038');
  let _tagObject = new Tag();
  let menuObject = new Menu('ES038');

  let Tag1 = faker.lorem.sentence().substring(0, 10);
  Tag1 = Tag1.trim();
  let slug = faker.lorem.slug(100);

  it("Test Crear tag con slug con más de 186 caracteres ", () => {
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

    // AND: usuario guarda tag
    _tagObject.when_user_save_tag ();
    // THEN: valida boton retry
    _tagObject.then_valida_boton_retry();
   

  });
    
});