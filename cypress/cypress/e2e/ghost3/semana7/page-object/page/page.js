//Estrategia a priori
const dataBlank = require("../../a-priori/data/field_blank.json");
const dataTitleAndDescription = require("../../a-priori/data/title_and_description.json");
const any_text = require("../../a-priori/data/any_text.json");
const urls = require("../../a-priori/data/url.json");
const videos = require("../../a-priori/data/url_videos.json");
const fechas_anteriores = require("../../a-priori/data/fechas_anteriores.json");
const fechas_posteriores = require("../../a-priori/data/fechas_posteriores.json");
const horas = require("../../a-priori/data/horas.json");
const horas_error = require("../../a-priori/data/horas_error.json");

import { faker } from "@faker-js/faker";

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

  when_user_type_title_a_priory = () => {
    let index = this.getIndexRandom(1, 1000);
    cy.get('textarea[placeholder="Page Title"]').type(dataTitleAndDescription[index].title);
  };

  when_user_type_title_random = () => {
    let index = this.getIndexRandom(1, 1000);
    cy.get('textarea[placeholder="Page Title"]').type(faker.lorem.words(3));
  };

  when_user_type_content_a_priory = () => {
    let index = this.getIndexRandom(1, 1000);
    cy.get(".koenig-editor__editor")
      .find('p[data-koenig-dnd-droppable="true"]')
      .invoke("html", dataTitleAndDescription[index].description);
    cy.wait(500);
  };

  when_user_type_content_random = () => {
    cy.get(".koenig-editor__editor")
      .find('p[data-koenig-dnd-droppable="true"]')
      .invoke("html", faker.lorem.words(7));
    cy.wait(500);
    cy.screenshot(`${this.scenario}/type_title_and_content`);
  };

  when_user_type_title_and_content_a_priory = () => {
    let index = this.getIndexRandom(1, 1000);
    cy.get('textarea[placeholder="Page Title"]').type(dataTitleAndDescription[index].title);
    cy.get(".koenig-editor__editor")
      .find('p[data-koenig-dnd-droppable="true"]')
      .invoke("html", dataTitleAndDescription[index].description);
    cy.wait(500);
    cy.screenshot(`${this.scenario}/type_title_and_content`);
  };

  when_user_type_title_and_content_random = () => {
    cy.get('textarea[placeholder="Page Title"]').type(faker.lorem.words(3));
    cy.get(".koenig-editor__editor")
      .find('p[data-koenig-dnd-droppable="true"]')
      .invoke("html", faker.lorem.words(7));
    cy.wait(500);
    cy.screenshot(`${this.scenario}/type_title_and_content`);
  };

  when_user_edit_long_title_random = () => {
    cy.get('a[title="Edit this page"]:eq(0)').click();
    cy.wait(100);
    cy.get('textarea[placeholder="Page Title"]').type(faker.lorem.words(100));
    cy.wait(500);
  };

  when_user_edit_long_content_random = () => {
    cy.get('a[title="Edit this page"]:eq(0)').click();
    cy.wait(100);
    cy.get(".koenig-editor__editor")
      .find('p[data-koenig-dnd-droppable="true"]')
      .invoke("html", faker.lorem.words(300));
    cy.wait(500);
  };

  when_user_publish_page = () => {
    cy.get("div.gh-publishmenu-trigger").click();
    cy.wait(100);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(500);

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

  then_title_too_long = () => {
    cy.get("div.gh-alert-content")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("Saving failed: Title cannot be longer than 255 characters.");
      });
  };

  then_content_too_long = () => {
    cy.get("div.gh-alert-content")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.equal("Saving failed: Title cannot be longer than 255 characters.");
      });
  };

  when_user_click_on_edit_page_a_priory = () => {
    let index = this.getIndexRandom(1, 1000);
    cy.get('a[title="Edit this page"]:eq(0)').click();
    cy.wait(100);
    cy.get('textarea[placeholder="Page Title"]').type(any_text[index].cualquier_texto);
    cy.wait(500);
    cy.get("div.gh-publishmenu-trigger").click();
    cy.wait(500);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(2500);
    cy.screenshot(`${this.scenario}/click_on_edit_page`);
  };

  when_user_click_on_edit_page_random = () => {
    cy.get('a[title="Edit this page"]:eq(0)').click();
    cy.wait(100);
    cy.get('textarea[placeholder="Page Title"]').type(faker.lorem.words(1));
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

  };

  then_page_was_saved = () => {
    cy.get(
      "aside > article > .gh-notification-content > .gh-notification-title"
    ).then(($title) => {
      expect($title[0].innerText).to.equal("Saved");
    });

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

  when_user_click_on_add_button = () => {
    cy.get('div[data-placeholder="Begin writing your page..."').click()
      cy.wait(100)
    cy.get('button[aria-label="Add a card"]').click();
    cy.wait(100);
  };

  when_user_click_on_add_url = () => {
    this.when_user_click_on_add_button()
    cy.contains('div.f8.lh-heading.darkgrey.tracked-1.fw4.ma0.ml4.flex-grow-1.truncate', 'Other...').click();
    cy.wait(100);
  }
  
  when_user_click_on_content = () => {
    cy.get('div[data-placeholder="Begin writing your page..."').click()
      cy.wait(100)
  };

  when_user_type_wrong_url_a_priory = () => {
    let index = this.getIndexRandom(1, 1000);
    cy.get('input[name="url"]').type(any_text[index].cualquier_texto);
    cy.wait(100);
    cy.get('div.gh-koenig-editor-pane').click()
  }

  when_user_type_wrong_url_random = () => {
    cy.get('input[name="url"]').type(faker.lorem.words(3));
    cy.wait(100);
    cy.get('div.gh-koenig-editor-pane').click()
  }

  when_user_type_url_a_priory = () => {
    let index = this.getIndexRandom(1, 30);
    cy.get('input[name="url"]').type(videos[index].url);
    cy.wait(500);
    cy.get('div.gh-koenig-editor-pane').click()
  }

  when_user_type_url_random = () => {
    cy.get('input[name="url"]').type(faker.internet.url());
    cy.wait(100);
    cy.get('div.gh-koenig-editor-pane').click()
  }

  when_bad_edit_the_publication_date_of_a_page_a_priory = () => {
    let index = this.getIndexRandom(1, 50);
    cy.get('a[title="Edit this page"]:eq(0)').click();
    cy.wait(100);
    cy.get("div.gh-publishmenu-trigger").click();
    cy.wait(500);
    cy.contains("div.gh-publishmenu-radio-label","Unpublished").click();
    cy.wait(100);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(100);
    cy.get("div.gh-publishmenu-radio-button").eq(1).click();
    cy.wait(100);
    cy.get('input[placeholder="YYYY-MM-DD"]').eq(0).clear().type(fechas_anteriores[index].fecha)
    cy.wait(100);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(500);
  };

  when_bad_edit_the_publication_date_of_a_page_random = () => {
    let index = this.getIndexRandom(1, 50);
    cy.get('a[title="Edit this page"]:eq(0)').click();
    cy.wait(100);
    cy.get("div.gh-publishmenu-trigger").click();
    cy.wait(500);
    cy.contains("div.gh-publishmenu-radio-label","Unpublished").click();
    cy.wait(100);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(100);
    cy.get("div.gh-publishmenu-radio-button").eq(1).click();
    cy.wait(100);
    cy.get('input[placeholder="YYYY-MM-DD"]').eq(0).clear().type(fechas_anteriores[index].fecha)
    cy.wait(100);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(500);
  };

  when_edit_the_publication_date_of_a_page_a_priory = () => {
    let index = this.getIndexRandom(1, 50);
    cy.get('a[title="Edit this page"]:eq(0)').click();
    cy.wait(100);
    cy.get("div.gh-publishmenu-trigger").click();
    cy.wait(500);
    cy.contains("div.gh-publishmenu-radio-label","Unpublished").click();
    cy.wait(100);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(100);
    cy.get("div.gh-publishmenu-radio-button").eq(1).click();
    cy.wait(100);
    cy.get('input[placeholder="YYYY-MM-DD"]').eq(0).clear().type(fechas_posteriores[index].fecha)
    cy.wait(100);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(500);
  };

  when_edit_the_publication_date_of_a_page_random = () => {
    let index = this.getIndexRandom(1, 50);
    cy.get('a[title="Edit this page"]:eq(0)').click();
    cy.wait(100);
    cy.get("div.gh-publishmenu-trigger").click();
    cy.wait(500);
    cy.contains("div.gh-publishmenu-radio-label","Unpublished").click();
    cy.wait(100);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(100);
    cy.get("div.gh-publishmenu-radio-button").eq(1).click();
    cy.wait(100);
    cy.get('input[placeholder="YYYY-MM-DD"]').eq(0).clear().type(fechas_posteriores[index].fecha)
    cy.wait(100);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(500);
  };

  when_edit_the_publication_time_of_a_page_a_priory = () => {
    let index = this.getIndexRandom(1, 50);
    cy.get('a[title="Edit this page"]:eq(0)').click();
    cy.wait(100);
    cy.get("div.gh-publishmenu-trigger").click();
    cy.wait(500);
    cy.contains("div.gh-publishmenu-radio-label","Unpublished").click();
    cy.wait(100);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(100);
    cy.get("div.gh-publishmenu-radio-button").eq(1).click();
    cy.wait(100);
    cy.get('div.gh-date-time-picker-time > input[type="text"]').eq(0).clear().type(horas[index].hora)
    cy.wait(100);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(500);
  };

  when_bad_edit_the_publication_time_of_a_page_a_priory = () => {
    let index = this.getIndexRandom(1, 50);
    cy.get('a[title="Edit this page"]:eq(0)').click();
    cy.wait(100);
    cy.get("div.gh-publishmenu-trigger").click();
    cy.wait(500);
    cy.contains("div.gh-publishmenu-radio-label","Unpublished").click();
    cy.wait(100);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(100);
    cy.get("div.gh-publishmenu-radio-button").eq(1).click();
    cy.wait(100);
    cy.get('div.gh-date-time-picker-time > input[type="text"]').eq(0).clear().type(horas_error[index].hora)
    cy.wait(100);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(500);
  };

  when_edit_the_publication_time_of_a_page_random = () => {
    let horas = faker.datatype.number({min: 22,max: 23});
    let minutos = faker.datatype.number({min: 10,max: 59});
    cy.get('a[title="Edit this page"]:eq(0)').click();
    cy.wait(100);
    cy.get("div.gh-publishmenu-trigger").click();
    cy.wait(500);
    cy.contains("div.gh-publishmenu-radio-label","Unpublished").click();
    cy.wait(100);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(100);
    cy.get("div.gh-publishmenu-radio-button").eq(1).click();
    cy.wait(100);
    cy.get('div.gh-date-time-picker-time > input[type="text"]').eq(0).clear().type(horas+":"+minutos)
    cy.wait(100);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(500);
  };

  when_bad_edit_the_publication_time_of_a_page_random = () => {
    let horas = faker.datatype.number({min: 24,max: 300});
    let minutos = faker.datatype.number({min: 60,max: 300});
    cy.get('a[title="Edit this page"]:eq(0)').click();
    cy.wait(100);
    cy.get("div.gh-publishmenu-trigger").click();
    cy.wait(500);
    cy.contains("div.gh-publishmenu-radio-label","Unpublished").click();
    cy.wait(100);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(100);
    cy.get("div.gh-publishmenu-radio-button").eq(1).click();
    cy.wait(100);
    cy.get('div.gh-date-time-picker-time > input[type="text"]').eq(0).clear().type(horas+":"+minutos)
    cy.wait(100);
    cy.get("button.gh-publishmenu-button").click();
    cy.wait(500);
  };

  then_check_wrong_ulr = () => {
    cy.get('span.mr3')
    .should('be.visible')
    .should('contain', 'There was an error');
  }

  then_check_ulr = () => {
    cy.get('div.koenig-card-click-overlay')
    .should('be.visible')
  }

  then_check_random_ulr = () => {
    cy.get('div[data-koenig-dnd-draggable="true"]')
    .should('exist');
  }

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

  then_page_was_not_modified = () => {
    cy.get("div.gh-date-time-picker-error").should("exist")

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
          cy.get("button.gh-btn-red").click();
          cy.wait(2500);
        });
    } catch (err) {
      console.log(err);
    }
  };

  
  getIndexRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}