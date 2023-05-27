export class PageTag {

    get newPageButton() {
      return cy.get('header.post-header > .view-actions > a[href="#/editor/page/"]');
    }
    get lastestPostTitle() {
      return cy.get('.posts-list > li.gh-posts-list-item > h3')[0];
    }
    get goBackToPagesLink() {
      return cy.get('a[href="#/pages/"].blue');
    }
    get pageTitle() {
      return cy.get('textarea[placeholder="Page Title"]');
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
  
    constructor() { }
  
    when_user_click_on_new_page = () => {
      this.newPageButton.click();
    };
  
    when_user_click_on_go_back_to_pages = () => {
      cy.wait(5000);
      this.goBackToPagesLink.click();
      cy.wait(1000);
    };
  
    when_user_click_on_lastest_page = () => {
      cy.get('.gh-list > li.gh-posts-list-item > a').then(links => {
        links[0].click();
      });
    };
  
    when_user_type_title_and_content = (title = "nueva page") => {
      this.pageTitle.type(title);
      cy.window().then((win) => {
        win.document.querySelector('p[data-koenig-dnd-droppable="true"]').innerHTML = "Hola mundo!";
      });
      cy.wait(500);
    };
  
    when_user_update_title_and_content = () => {
      this.postTitle.type(" edited");
      cy.window().then((win) => {
        win.document.querySelector('p[data-koenig-dnd-droppable="true"]').innerHTML = "Hello Edited post";
      });
      cy.wait(500);
    };
  
    when_user_publish_page = () => {
      this.publishSplitButton.click();
      cy.wait(100);
      this.publishButton.click();
      cy.wait(1000);
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
    };
  
    then_page_was_Edited = () => {
      cy.get(
        "aside > article > .gh-notification-content > .gh-notification-title"
      ).then(($title) => {
        expect($title[0].innerText).to.equal("Updated");
      });
  
      cy.wait(3000);
      cy.get("div.gh-publishmenu-trigger").then(($action) => {
        expect($action[0].innerText.trim()).to.equal("Update");
      });
      cy.wait(2000);
    };
  
    then_latest_post_was_edited = () => {
      cy.get('.posts-list > li.gh-posts-list-item > a > h3').then(titles => {
        expect(titles[0].innerText).to.equal("nuevo post edited");
      });
    };
  
    then_latest_post_was_deleted = () => {
      cy.window().then((win) => {
        const posts = win.document.querySelectorAll('.posts-list > li.gh-posts-list-item > a > h3').length;
        if (posts > 0) {
          expect(titles[0].innerText).not.to.equal("post to delete");
        } else {
          expect(posts).to.equal(0);
        }
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
  