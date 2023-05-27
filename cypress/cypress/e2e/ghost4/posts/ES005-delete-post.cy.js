import { Login } from "../login/login";
import { Menu } from "../menu/menu";
import { Site } from "../site/site";
import { Post } from "./post";


describe("Testing post creation", () => {
  let _siteObject = new Site('ES005');
  let _loginObject = new Login('ES005');
  let _postObject = new Post('ES005');
  let menuObject = new Menu('ES005');

  it("Test create new post", () => {
    // GIVEN: usuario autenticado
    _siteObject.given_user_visit_ghost();
    _loginObject.when_user_enter_credentials_and_click_on_login();
    // AND: usuario navega a la pantalla posts
    menuObject.when_user_navigate_to_posts();
    // AND: usuario da click en el boton new post
    _postObject.when_user_click_on_new_post();
    // AND: usuario ingresa el titulo y contenido del post
    _postObject.when_user_type_title_and_content("post to delete");
    // AND: usuario publica el post
    _postObject.when_user_publish_post();

    // WHEN: usuario navega al listado de posts
    _postObject.when_user_click_on_go_back_to_posts();
    // AND: click en el primer post de la lista, ultimo creado
    _postObject.when_user_click_on_lastest_post();
    // AND: delete the post
    _postObject.when_user_delete_current_post();

    // THEN: el post fue eliminado
    _postObject.then_latest_post_was_deleted();
  });
});
