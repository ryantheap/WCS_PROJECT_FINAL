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
    cy.get('[data-testid="list-card-composer-textarea"]').type("card title");
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

    cy.contains("card title").click();
    cy.wait(1000);
    cy.get(
      '[aria-label="Zone de contenu principale, commencez à taper pour saisir du texte."]'
    ).type("card.description");
    cy.get('[data-testid="editor-save-button"]').click();
    cy.get('[aria-label="Fermer la boîte de dialogue"]').click();
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

    cy.contains("card title").click();
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
