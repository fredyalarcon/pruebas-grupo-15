import { Login } from "../login/login";
import { Menu } from "../menu/menu";
import { Site } from "../site/site";
import { Tag } from "./tag";
import { Post } from "../posts/post";

describe("Testing assign tag to post", () => {
  let _siteObject = new Site("http://localhost:2368/ghost/#/signin");
  let _loginObject = new Login();
  let _tagObject = new Tag();
  let menuObject = new Menu();
  let _postObject = new Post();
  let edslut = '';
  const tagPost = "Cypress tag post";
  const namePost = "post tag";

  it("Testing assign tag to post", () => {
    // GIVEN: usuario autenticado
    _siteObject.given_user_visit_ghost();
    _loginObject.when_user_enter_credentials_and_click_on_login();

    // WHEN: usuario navega a la pantalla tag
    menuObject.when_user_navigate_to_tags();
    // AND: usuario da click en el boton new tag
    _tagObject.when_user_click_on_new_tag();
    // AND: usuario ingresa el nombre del tag
    _tagObject.when_user_name_tag(tagPost);
    // AND: usuario guarda tag
    _tagObject.when_user_save_tag ();    
    // THEN: valida título tag
    _tagObject.then_valida_titulo_tag(tagPost);

  // AND: usuario navega a la pantalla posts
  menuObject.when_user_navigate_to_posts();
  // AND: usuario da click en el boton new post
  _postObject.when_user_click_on_new_post();
  // AND: usuario ingresa el titulo y contenido del post
  _postObject.when_user_type_title_and_content(namePost);
  // AND: usuario publica el post
  _postObject.when_user_publish_post();

  // WHEN: usuario navega al listado de posts
  _postObject.when_user_click_on_go_back_to_posts();
  // AND: click en el primer post de la lista, ultimo creado
  _postObject.when_user_click_on_lastest_post();
  // AND: asigna tag al post
  _tagObject.when_user_assign_tag_post(tagPost);
  // AND: usuario publica el post
  _postObject.when_user_publish_post();

   // THEN: el post fue editado
   _postObject.then_post_was_Edited();
   // AND: go back
   _postObject.when_user_click_on_go_back_to_posts();
   // AND: latest posts was edited:
   _tagObject.then_latest_post_was_edited(namePost);

  });
});