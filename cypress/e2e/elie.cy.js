describe("US Elie", () => {
  it("Create a new card", () => {
    cy.visit("https://trello.com");
    cy.contains("Log in").click();

    // LOGIN
    cy.origin("https://id.atlassian.com", () => {
      cy.get("#username").type("wcsgroupe@gmail.com");
      cy.get("#login-submit").click();
      cy.get("#password").type("Groupe3wcs.");
      cy.get("#login-submit").click();
    });

    cy.get('[href="/b/TTa3PUmL/projet-final-groupe-3"]').click();
    cy.wait(3000);
    cy.contains("Ajouter une carte").click();

    cy.fixture("elie").then((cardData) => {
      cy.get('[data-testid="list-card-composer-textarea"]').type(
        cardData.card_title
      );
    });
    cy.contains("Ajouter une carte").click();
  });

  it("Add a description", () => {
    cy.visit("https://trello.com");
    cy.contains("Log in").click();

    // LOGIN
    cy.origin("https://id.atlassian.com", () => {
      cy.get("#username").type("wcsgroupe@gmail.com");
      cy.get("#login-submit").click();
      cy.get("#password").type("Groupe3wcs.");
      cy.get("#login-submit").click();
    });

    cy.get('[href="/b/TTa3PUmL/projet-final-groupe-3"]').click();
    cy.wait(3000);

    cy.fixture("elie").then((cardData) => {
      cy.contains(cardData.card_title).click();
      cy.wait(1000);
      cy.get(
        '[aria-label="Zone de contenu principale, commencez à taper pour saisir du texte."]'
      ).type(cardData.card_description);
      cy.get('[data-testid="editor-save-button"]').click();
      cy.get('[aria-label="Fermer la boîte de dialogue"]').click();
    });
  });

  it("Move a card", () => {
    cy.visit("https://trello.com");
    cy.contains("Log in").click();

    // LOGIN
    cy.origin("https://id.atlassian.com", () => {
      cy.get("#username").type("wcsgroupe@gmail.com");
      cy.get("#login-submit").click();
      cy.get("#password").type("Groupe3wcs.");
      cy.get("#login-submit").click();
    });

    cy.get('[href="/b/TTa3PUmL/projet-final-groupe-3"]').click();
    cy.wait(3000);

    cy.fixture("elie").then((cardData) => {
      cy.contains(cardData.card_title).click();
      cy.wait(3000);
      cy.contains("Déplacer").click();
      cy.get('[data-testid="move-card-popover-select-list-destination"]')
        .click()
        .type("In Progress")
        .trigger("keydown", {
          key: "Enter",
        });
      cy.get('[data-testid="move-card-popover-move-button"]').click();
      cy.get('[aria-label="Fermer la boîte de dialogue"]').click();
    });
  });

  it("Add a comment", () => {
    cy.visit("https://trello.com");
    cy.contains("Log in").click();

    // LOGIN
    cy.origin("https://id.atlassian.com", () => {
      cy.get("#username").type("wcsgroupe@gmail.com");
      cy.get("#login-submit").click();
      cy.get("#password").type("Groupe3wcs.");
      cy.get("#login-submit").click();
    });

    cy.get('[href="/b/TTa3PUmL/projet-final-groupe-3"]').click();
    cy.wait(3000);

    cy.fixture("elie").then((cardData) => {
      cy.contains(cardData.card_title).click();
      cy.wait(3000);
      cy.get(".js-new-comment-react-root")
        .click()
        .wait(3000)
        .type(cardData.card_comment);
      cy.get('[data-testid="card-back-comment-save-button"').click();
      cy.get('[aria-label="Fermer la boîte de dialogue"]').click();
    });
  });

  it("Update a comment", () => {
    cy.visit("https://trello.com");
    cy.contains("Log in").click();

    // LOGIN
    cy.origin("https://id.atlassian.com", () => {
      cy.get("#username").type("wcsgroupe@gmail.com");
      cy.get("#login-submit").click();
      cy.get("#password").type("Groupe3wcs.");
      cy.get("#login-submit").click();
    });

    cy.get('[href="/b/TTa3PUmL/projet-final-groupe-3"]').click();
    cy.wait(3000);

    cy.fixture("elie").then((cardData) => {
      cy.contains(cardData.card_title).click();
      cy.wait(3000);
      cy.contains(cardData.card_comment)
        .closest(".mod-comment-type")
        .get(".js-edit-action")
        .click();
      cy.wait(3000);
      cy.get(".ProseMirror-focused").type(
        "{backspace}".repeat(cardData.card_comment.length) +
          cardData.card_comment_update
      );
      cy.get(".js-edit-comment-react-root").contains("Enregistrer").click();
      cy.get('[aria-label="Fermer la boîte de dialogue"]').click();
    });
  });

  it("Delete a comment", () => {
    cy.visit("https://trello.com");
    cy.contains("Log in").click();

    // LOGIN
    cy.origin("https://id.atlassian.com", () => {
      cy.get("#username").type("wcsgroupe@gmail.com");
      cy.get("#login-submit").click();
      cy.get("#password").type("Groupe3wcs.");
      cy.get("#login-submit").click();
    });

    cy.get('[href="/b/TTa3PUmL/projet-final-groupe-3"]').click();
    cy.wait(3000);

    cy.fixture("elie").then((cardData) => {
      cy.contains(cardData.card_title).click();
      cy.wait(3000);
      cy.contains(cardData.card_comment_update)
        .closest(".mod-comment-type")
        .get(".js-confirm-delete-action")
        .click();
      cy.get('[value="Supprimer le commentaire"]').click();
      cy.get('[aria-label="Fermer la boîte de dialogue"]').click();
    });
  });

  it("Click filter button", () => {
    cy.visit("https://trello.com");
    cy.contains("Log in").click();

    // LOGIN
    cy.origin("https://id.atlassian.com", () => {
      cy.get("#username").type("wcsgroupe@gmail.com");
      cy.get("#login-submit").click();
      cy.get("#password").type("Groupe3wcs.");
      cy.get("#login-submit").click();
    });

    cy.get('[href="/b/TTa3PUmL/projet-final-groupe-3"]').click();
    cy.wait(3000);

    cy.get('[data-testid="filter-popover-button"]').click();
    cy.contains(
      "Recherchez des cartes, des membres, des étiquettes et plus encore."
    ).should("be.visible");
  });
  it("Check date filter", () => {
    cy.visit("https://trello.com");
    cy.contains("Log in").click();

    // LOGIN
    cy.origin("https://id.atlassian.com", () => {
      cy.get("#username").type("wcsgroupe@gmail.com");
      cy.get("#login-submit").click();
      cy.get("#password").type("Groupe3wcs.");
      cy.get("#login-submit").click();
    });

    cy.get('[href="/b/TTa3PUmL/projet-final-groupe-3"]').click();
    cy.wait(3000);

    cy.get('[data-testid="filter-popover-button"]').click();
    cy.contains(
      "Recherchez des cartes, des membres, des étiquettes et plus encore."
    ).should("be.visible");
    cy.get('[title="Aucune date limite"]')
      .closest("label")
      .get('[type="checkbox"]')
      .eq(3)
      .check({ force: true });
    cy.get('[aria-label="Fermer l\'infobulle"]').click();
  });
});
