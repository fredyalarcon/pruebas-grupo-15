import { faker } from "@faker-js/faker";

const _DATA_A_PRIORI = require("../../a-priori/data/title_and_description.json");
const _DATES_A_PRIORI = require("../../a-priori/data/dates.json");
const _URLS_A_PRIORI = require("../../a-priori/data/url.json");

export class Post {
  get newPostButton() {
    return cy.get(
      'header.post-header > .view-actions > a[href="#/editor/post/"]'
    );
  }
  get lastestPostTitle() {
    return cy.get(".posts-list > li.gh-posts-list-item > h3")[0];
  }
  get goBackToPostsLink() {
    return cy.get(".blue.link");
  }
  get postTitle() {
    return cy.get('textarea[placeholder="Post Title"]');
  }
  get publishSplitButton() {
    return cy.get("div.gh-publishmenu-trigger");
  }
  get publishButton() {
    return cy.get("button.gh-publishmenu-button");
  }
  get settingButton() {
    return cy.get("button.post-settings");
  }
  get deleteButton() {
    return cy.get("button.settings-menu-delete-button");
  }
  get deleteConfirmationButton() {
    return cy.get(".modal-content > .modal-footer > button.gh-btn-red");
  }

  scenario = "";
  dataIndex = 0;
  dataIndex2 = 0;

  DATA_A_PRIORI = [];
  DATES_A_PRIORI = [];
  URLS_A_PRIORI = [];

  constructor(scenario = "") {
    this.DATA_A_PRIORI = _DATA_A_PRIORI;
    this.DATES_A_PRIORI = _DATES_A_PRIORI;
    this.URLS_A_PRIORI = _URLS_A_PRIORI;
    this.scenario = scenario;
    this.dataIndex = this.getIndexRandom(1, this.DATA_A_PRIORI.length);
    this.dataIndex2 = this.getIndexRandom(1, this.DATA_A_PRIORI.length);
  }

  getIndexRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  when_user_click_on_new_post = () => {
    this.newPostButton.click();
    cy.screenshot(`${this.scenario}/click_on_new_post`);
  };

  when_user_click_on_go_back_to_posts = () => {
    cy.wait(5000);
    this.goBackToPostsLink.click();
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/go_back_to_posts`);
  };

  when_user_click_on_lastest_post = () => {
    cy.get(".gh-contentfilter-type").click();
    cy.get('li[data-option-index="2"]').click();
    cy.get(".posts-list > li.gh-posts-list-item > a").then((links) => {
      links[0].click();
    });
    cy.screenshot(`${this.scenario}/user_click_on_lastest_post`);
  };

  when_user_click_on_lastest_schedule_post = () => {
    cy.get(".gh-contentfilter-type").click();
    cy.get('li[data-option-index="3"]').click();
    cy.get(".posts-list > li.gh-posts-list-item > a").then((links) => {
      links[0].click();
    });
    cy.screenshot(`${this.scenario}/user_click_on_lastest_post`);
  };

  when_user_type_title_and_content_a_priori = () => {
    this.postTitle.type(this.DATA_A_PRIORI[this.dataIndex].title);
    cy.window().then((win) => {
      win.document.querySelector(
        'p[data-koenig-dnd-droppable="true"]'
      ).innerHTML = this.DATA_A_PRIORI[this.dataIndex].description;
    });
    cy.wait(500);
    cy.screenshot(`${this.scenario}/user_type_title_and_content`);
  };

  when_user_type_title_and_content_aleatorio = () => {
    this.postTitle.type(faker.lorem.words(3));
    cy.window().then((win) => {
      win.document.querySelector(
        'p[data-koenig-dnd-droppable="true"]'
      ).innerHTML = faker.lorem.words(7);
    });
    cy.wait(500);
    cy.screenshot(`${this.scenario}/user_type_title_and_content`);
  };

  when_user_edit_metadata_a_priori = () => {
    this.settingButton.click();
    cy.wait(500);
    cy.get(".nav-list-block > li > button").then((b) => b[0].click());
    cy.wait(500);
    cy.get('input[name="post-setting-meta-title"]').type(
      this.DATA_A_PRIORI[this.dataIndex].title
    );
    cy.get('textarea[name="post-setting-meta-description"]').type(
      this.DATA_A_PRIORI[this.dataIndex].description
    );
    cy.screenshot(`${this.scenario}/edit_metadata`);
    cy.get(".back.settings-menu-header-action").click();
    cy.get(".close.settings-menu-header-action").click();
  };

  when_user_edit_metadata_aleatorio = () => {
    this.settingButton.click();
    cy.wait(500);
    cy.get(".nav-list-block > li > button").then((b) => b[0].click());
    cy.wait(500);
    cy.get('input[name="post-setting-meta-title"]').type(faker.lorem.words(3));
    cy.get('textarea[name="post-setting-meta-description"]').type(
      faker.lorem.words(7)
    );
    cy.screenshot(`${this.scenario}/edit_metadata`);
    cy.get(".back.settings-menu-header-action").click();
    cy.get(".close.settings-menu-header-action").click();
  };

  when_user_edit_excerpt = () => {
    this.settingButton.click();
    cy.wait(500);
    cy.get('textarea[name="post-setting-custom-excerpt"]').type(
      this.DATA_A_PRIORI[this.dataIndex2].description
    );
    cy.wait(500);
    cy.screenshot(`${this.scenario}/edit_excerpt`);
    cy.get(".close.settings-menu-header-action").click();
  };

  when_user_edit_excerpt_aleatorio = () => {
    this.settingButton.click();
    cy.wait(500);
    cy.get('textarea[name="post-setting-custom-excerpt"]').type(
      faker.lorem.words(5)
    );
    cy.wait(500);
    cy.screenshot(`${this.scenario}/edit_excerpt`);
    cy.get(".close.settings-menu-header-action").click();
  };

  when_user_add_image = () => {
    cy.wait(1000);
    cy.window().then((win) => {
      win.document.querySelector(
        'p[data-koenig-dnd-droppable="true"]'
      ).innerHTML = "";
      cy.get(".koenig-editor").invoke("show").click({ force: true });

      cy.get(".koenig-plus-menu-button").click();
      cy.get('div[title="Image"').click();

      cy.get("figure > div > .x-file-input > input").selectFile(
        "cypress/fixtures/fondo.jpg",
        { force: true }
      );
      cy.wait(1000);
      cy.screenshot(`${this.scenario}/add_images`);
    });

    cy.wait(2000);
  };

  when_user_add_embed_url = () => {
    cy.wait(1000);
    cy.window().then((win) => {
      win.document.querySelector(
        'p[data-koenig-dnd-droppable="true"]'
      ).innerHTML = "";
      cy.get(".koenig-editor").invoke("show").click({ force: true });

      cy.get(".koenig-plus-menu-button").click();
      cy.get('div[title="Other..."').click();

      cy.get("input[name=url]").type(this.URLS_A_PRIORI[this.dataIndex].url);
      cy.wait(1000);
      cy.screenshot(`${this.scenario}/embed_url`);
    });

    cy.wait(2000);
  };

  when_user_add_embed_url_aleatorio = () => {
    cy.wait(1000);
    cy.window().then((win) => {
      win.document.querySelector(
        'p[data-koenig-dnd-droppable="true"]'
      ).innerHTML = "";
      cy.get(".koenig-editor").invoke("show").click({ force: true });

      cy.get(".koenig-plus-menu-button").click();
      cy.get('div[title="Other..."').click();

      cy.get("input[name=url]").type(faker.internet.url());
      cy.wait(1000);
      cy.screenshot(`${this.scenario}/embed_url`);
    });

    cy.wait(2000);
  };

  when_user_add_bookmark = () => {
    cy.wait(1000);
    cy.window().then((win) => {
      win.document.querySelector(
        'p[data-koenig-dnd-droppable="true"]'
      ).innerHTML = "";
      cy.get(".koenig-editor").invoke("show").click({ force: true });

      cy.get(".koenig-plus-menu-button").click();
      cy.get('div[title="Bookmark"').click();

      cy.get("input[name=url]").type(this.URLS_A_PRIORI[this.dataIndex2].url);
      cy.wait(1000);
      cy.screenshot(`${this.scenario}/add_bookmark`);
    });
  };

  when_user_add_bookmark_aleatorio = () => {
    cy.wait(1000);
    cy.window().then((win) => {
      win.document.querySelector(
        'p[data-koenig-dnd-droppable="true"]'
      ).innerHTML = "";
      cy.get(".koenig-editor").invoke("show").click({ force: true });

      cy.get(".koenig-plus-menu-button").click();
      cy.get('div[title="Bookmark"').click();

      cy.get("input[name=url]").type(faker.internet.url());
      cy.wait(1000);
      cy.screenshot(`${this.scenario}/add_bookmark`);
    });

    cy.wait(7000);
  };

  when_user_add_alt_text_to_image_a_priori = () => {
    cy.window().then((win) => {
      win.document.querySelector(
        ".koenig-basic-html-input__editor-wrappper > div > p"
      ).innerHTML = this.DATA_A_PRIORI[this.dataIndex2].description;
    });
    cy.wait(1000);
  };

  when_user_add_alt_text_to_image_a_aleatorio = () => {
    cy.window().then((win) => {
      win.document.querySelector(
        ".koenig-basic-html-input__editor-wrappper > div > p"
      ).innerHTML = faker.lorem.words(7);
    });
    cy.wait(1000);
  };

  when_user_update_title_and_content_a_priori = () => {
    this.postTitle
      .clear()
      .type(this.DATA_A_PRIORI[this.dataIndex2].title, { force: true });
    cy.window().then((win) => {
      win.document.querySelector(
        'p[data-koenig-dnd-droppable="true"]'
      ).innerHTML = this.DATA_A_PRIORI[this.dataIndex2].description;
    });
    cy.wait(500);
    cy.screenshot(`${this.scenario}/user_update_title_and_content`);
  };

  when_user_update_title_and_content_aleatorio = () => {
    this.postTitle.clear().type(faker.lorem.words(3), { force: true });
    cy.window().then((win) => {
      win.document.querySelector(
        'p[data-koenig-dnd-droppable="true"]'
      ).innerHTML = faker.lorem.words(5);
    });
    cy.wait(500);
    cy.screenshot(`${this.scenario}/user_update_title_and_content`);
  };

  when_user_publish_post = () => {
    this.publishSplitButton.click({ force: true });
    cy.wait(100);
    this.publishButton.click();
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/user_publish_post`);
  };

  when_user_schedule_post_a_priori = () => {
    this.publishSplitButton.click();
    cy.wait(100);

    cy.get(".gh-publishmenu-radio").then(($radios) => {
      $radios[1].click();
    });
    cy.get(".gh-date-time-picker-date > input").then(($inputs) => {
      $inputs[0].value = this.DATES_A_PRIORI[this.dataIndex].date;
    });
    cy.wait(100);
    this.publishButton.click();
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/user_publish_post`);
  };

  when_user_schedule_post_aleatorio = () => {
    this.publishSplitButton.click();
    cy.wait(100);

    cy.get(".gh-publishmenu-radio").then(($radios) => {
      $radios[1].click();
    });
    cy.get(".gh-date-time-picker-date > input").then(($inputs) => {
      $inputs[0].value = faker.date.future().toISOString().split("T")[0];
    });
    cy.wait(100);
    this.publishButton.click();
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/user_publish_post`);
  };

  when_user_re_schedule_post_a_priori = () => {
    this.publishSplitButton.click();
    cy.wait(100);

    cy.get(".gh-publishmenu-radio").then(($radios) => {
      $radios[1].click();
    });
    cy.get(".gh-date-time-picker-date > input").then(($inputs) => {
      $inputs[0].value = this.DATES_A_PRIORI[this.dataIndex2].date;
    });
    cy.wait(100);
    this.publishButton.click();
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/user_publish_post`);
  };

  when_user_re_schedule_post_aleatorio = () => {
    this.publishSplitButton.click();
    cy.wait(100);

    cy.get(".gh-publishmenu-radio").then(($radios) => {
      $radios[1].click();
    });
    cy.get(".gh-date-time-picker-date > input").then(($inputs) => {
      $inputs[0].value = faker.date.future().toISOString().split("T")[0];
    });
    cy.wait(100);
    this.publishButton.click();
    cy.wait(1000);
    cy.screenshot(`${this.scenario}/user_publish_post`);
  };

  then_post_was_published = () => {
    cy.get(
      "aside > article > .gh-notification-content > .gh-notification-title"
    ).then(($title) => {
      expect($title[0].innerText).to.equal("Published");
    });

    cy.get("div.gh-publishmenu-trigger").then(($action) => {
      expect($action[0].innerText.trim()).to.equal("Update");
    });
    cy.screenshot(`${this.scenario}/post_was_published`);
  };

  then_post_was_scheduled = () => {
    cy.get(
      "aside > article > .gh-notification-content > .gh-notification-title"
    ).then(($title) => {
      expect($title[0].innerText).to.equal("Scheduled");
    });

    cy.get("div.gh-publishmenu-trigger").then(($action) => {
      expect($action[0].innerText.trim()).to.equal("Scheduled");
    });
    cy.screenshot(`${this.scenario}/post_was_published`);
  };

  then_post_was_Edited = () => {
    cy.get(
      "aside > article > .gh-notification-content > .gh-notification-title"
    ).then(($title) => {
      expect($title[0].innerText).to.equal("Updated");
    });

    cy.get("div.gh-publishmenu-trigger").then(($action) => {
      expect($action[0].innerText.trim()).to.equal("Update");
    });
    cy.screenshot(`${this.scenario}/post_was_Edited`);
  };

  then_latest_post_was_edited = () => {
    cy.get(".posts-list > li.gh-posts-list-item > a > h3")
      .contains(this.DATA_A_PRIORI[this.dataIndex2].title)
      .then((titles) => {
        expect(titles[0].innerText).to.equal(
          this.DATA_A_PRIORI[this.dataIndex2].title
        );
        cy.screenshot(`${this.scenario}/latest_post_was_edited`);
      });
  };

  then_latest_post_was_edited_aletorio = () => {
    cy.get(".posts-list > li.gh-posts-list-item > a > h3").then((titles) => {
      expect(titles[0].innerText).not.to.be.undefined;
      cy.screenshot(`${this.scenario}/latest_post_was_edited`);
    });
  };

  then_latest_post_was_deleted = () => {
    cy.window().then((win) => {
      const posts = win.document.querySelectorAll(
        ".posts-list > li.gh-posts-list-item > a > h3"
      ).length;
      if (posts > 0) {
        expect(titles[0].innerText).not.to.equal("post to delete");
      } else {
        expect(posts).to.equal(0);
      }
      cy.screenshot(`${this.scenario}/post_was_deleted`);
    });
  };

  when_user_delete_current_post = () => {
    this.settingButton.click();
    cy.wait(500);
    this.deleteButton.click();
    cy.wait(500);
    this.deleteConfirmationButton.click();
  };
}
