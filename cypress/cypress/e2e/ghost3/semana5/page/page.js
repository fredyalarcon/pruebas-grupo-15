let pagesCountBeforeDeletion = 0;
let pagesCountAfterDeletion = 0;
let url;
export class Page {
  scenario = ''

  constructor(scenario = '') {
    this.scenario = scenario;
  }

  when_user_click_on_new_page = () => {
    cy.get('a[href="#/editor/page/"]').first().click();
    cy.wait(500);
    cy.screenshot(`${this.scenario}/click_on_new_page`);
  };

  when_user_type_title_and_content = () => {
    cy.get('textarea[placeholder="Page Title"]').type("Nueva Pagina");
    cy.get(".koenig-editor__editor")
      .find('p[data-koenig-dnd-droppable="true"]')
      .invoke("html", "Esta es mi primera pagina");
    cy.wait(500);
    cy.screenshot(`${this.scenario}/type_title_and_content`);
  };

  when_user_publish_page = () => {
    cy.get("div.gh-publishmenu-trigger").click();
    cy.wait(100);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(2500);
    cy.screenshot(`${this.scenario}/publish_page`);

  };

  when_user_get_back_to_open_new_page = () => {
    cy.get("button.gh-publish-back-button").click();
    cy.wait(100);
    cy.get('a[href="#/pages/"]').click();
    cy.wait(100);
    cy.get(
      "body > div.gh-app > div > main > section > section > div.gh-list-sticky > div.posts-list.gh-list.feature-memberAttribution > div:nth-child(1)"
    ).click();
  };

  when_user_get_back_from_the_page = () =>{
    cy.get('a[href="#/pages/"]').click();
    cy.wait(100);
  }

  then_page_was_published = () => {
    cy.get("div.flex > span > div")
      .invoke("text")
      .then((text) => {
        console.log(text.trim());
        expect(text.trim()).to.equal("Published");

        cy.get('a[href="#/pages/"').click();
        cy.wait(500)
        cy.screenshot(`${this.scenario}/page_published`);

      });
  };

  when_user_click_on_edit_page = () => {
    cy.get('a[title="Edit this page"]:eq(0)').click();
    cy.wait(100);
    cy.get('textarea[placeholder="Page Title"]').type(" Modificada");
    cy.wait(500);
    cy.get("div.gh-publishmenu-trigger").click();
    cy.wait(500);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(2500);
    cy.screenshot(`${this.scenario}/click_on_edit_page`);
  };

  when_user_get_page_link = () => {
    cy.get("button.post-settings").click();
    cy.wait(500);
    url = cy.get('input[name="post-setting-slug"]').invoke("val");
    console.log(url);
    cy.get('button[aria-label="Close"]').click();
    cy.wait(100);
    cy.get('a[href="#/pages/"').click();
    cy.wait(200);

    return url;
  };

  then_page_was_modified = () => {
    cy.get(
      "aside > article > .gh-notification-content > .gh-notification-title"
    ).then(($title) => {
      expect($title[0].innerText).to.equal("Updated");
    });

    cy.get('a[href="#/pages/"').click();
    cy.wait(500)
    cy.screenshot(`${this.scenario}/page_was_modified`);
  };

  when_user_click_on_delete_page = () => {
    cy.get('a[title="Edit this page"]').then(($before) => {
      pagesCountBeforeDeletion = $before.length;
      console.log("before: ", pagesCountBeforeDeletion);
    });
    cy.get('a[title="Edit this page"]:eq(0)').click();
    cy.wait(100);
    cy.get("button.post-settings").click();
    cy.wait(500);
    cy.get("button.settings-menu-delete-button").click();
    cy.wait(2500);
    cy.get("button.gh-btn-red").click();
    cy.wait(2500);
    cy.screenshot(`${this.scenario}/click_on_delete_this_page`);
  };

  then_page_was_deleted = () => {
    cy.get('a[title="Edit this page"]').then(($after) => {
      pagesCountAfterDeletion = $after.length;
      console.log("after: ", pagesCountAfterDeletion);
      expect(parseInt(pagesCountAfterDeletion)).to.be.lessThan(
        parseInt(pagesCountBeforeDeletion)
      );
      cy.screenshot(`${this.scenario}/page_was_deleted`);
    });
  };

  delete_all_pages = () => {
    try {
      cy.get('a[title="Edit this page"]')
        .not(":last")
        .each((page) => {
          cy.get('a[title="Edit this page"]:eq(0)').click();
          cy.wait(100);
          cy.get("button.post-settings").click();
          cy.wait(500);
          cy.get("button.settings-menu-delete-button").click();
          cy.wait(2500);
          cy.get("button.gh-btn-red").clicck();
          cy.wait(2500);
        });
    } catch (err) {
      console.log(err);
    }
  };
}