import { Login } from "../page-object/login/login";
import { Site } from "../page-object/site/site";
import { Menu } from "../page-object/menu/menu";
import { Tag } from "../page-object/tag/tag";
import { faker } from '@faker-js/faker';


describe("Crear tag con slug con de 185 caracteres", () => {
  let _siteObject = new Site('ES039');
  let _loginObject = new Login('ES039');
  let _tagObject = new Tag();
  let menuObject = new Menu('ES039');

  let Tag1 = '';
  while (Tag1.length < 5) {
    Tag1 += faker.random.arrayElement(faker.random.alpha().toUpperCase());
  }
  Tag1 = Tag1.toLowerCase();
  let slug = faker.lorem.slug(100);
  slug = slug.substring(0,180);
  let slugFinal = Tag1 + slug;

  it("Test Crear tag con slug con de 185 caracteres ", () => {
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
    // THEN: valida título tag
    _tagObject.then_valida_titulo_tag(Tag1);

  });
    
});