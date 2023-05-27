import { Login } from "../page-object/login/login";
import { Menu } from "../page-object/menu/menu";
import { Site } from "../page-object/site/site";
import { Post } from "../page-object/post/post";
import { faker } from "@faker-js/faker";

describe("Testing post creation", () => {
  let _siteObject = new Site('ES080');
  let _loginObject = new Login('ES080');
  let _postObject = new Post('ES080');
  let menuObject = new Menu('ES080');

  beforeEach(() => {
    // Generacion de un pool de datos dinamicos y reemplazando los datos a priori:
    const data = [];
    for (let index = 0; index < 1000; index++) {
      data.push({
        title: faker.lorem.words(3),
        description: faker.lorem.words(7),
      });
    }
    _postObject.DATA_A_PRIORI = data;

    const dates = [];
    for (let index = 0; index < 1000; index++) {
      dates.push({ date: faker.date.future().toISOString().split('T')[0] });
    }
    _postObject.DATES_A_PRIORI = dates;

    const urls = [];
    for (let index = 0; index < 1000; index++) {
      urls.push({ url: faker.internet.url() });
    }
    _postObject.URLS_A_PRIORI = urls;
  });

  afterEach(() => {
    _postObject.when_user_delete_current_post();
  });

  it("Test create new post", () => {
    // GIVEN: usuario autenticado
    _siteObject.given_user_visit_ghost();
    _loginObject.when_user_enter_credentials_and_click_on_login();

    // WHEN: usuario navega a la pantalla posts
    menuObject.when_user_navigate_to_posts();
    // AND: usuario da click en el boton new post
    _postObject.when_user_click_on_new_post();
    // AND: usuario ingresa el titulo y contenido del post
    _postObject.when_user_type_title_and_content_a_priori();
    // AND: usuario agrega una imagen
    _postObject.when_user_edit_excerpt();
    // AND: usuario publica el post
    _postObject.when_user_publish_post();

    // THEN: el post fue publicado
    _postObject.then_post_was_published();
  });
});
