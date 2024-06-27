describe("projet trello", () => {
  it("verifier le header", () => {
    cy.visit("https://trello.com");
    cy.wait(10000);
    cy.get("#onetrust-accept-btn-handler").click({ force: false });
    cy.wait(3000);
    cy.get('[data-uuid="MJFtCCgVhXrVl7v9HA7EH_login"]').and(
      "have.text",
      "Log in"
    );
    cy.wait(3000);
    cy.get(".Tabsstyles__Link-sc-1grh34k-0").and("have.text", "Pricing");
    cy.get(".Buttonsstyles__PrimaryButton-sc-1jwidxo-1").and(
      "have.text",
      "Get Trello for free"
    );
    cy.get("h1").and(
      "have.text",
      "Trello brings all your tasks, teammates, and tools together"
    );
    cy.wait(3000);
  });
  //cy.get(".Logo-sc-1anfgcw-0 gguOta").should('be.visible')
  it("Login", () => {
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
    cy.fixture("cardData").then((cardData) => {
      /* Ajouter les cartes */
      cardData.forEach((card) => {
        cy.contains("Ajouter une carte").click();
        cy.get('[data-testid="list-card-composer-textarea"]').type(card.title);
      });
      //ajoute la date de rapel
      cy.contains(cardData[0].title).click();
      cy.get('[data-testid="card-back-due-date-button"]').click();
      cy.get(":nth-child(5) > :nth-child(6) > .css-1w4y8d4").click();
      cy.get(":nth-child(1) > .qiRZsRWzF1UVUP > .x__X83c1QM1uFb").click();
      cy.get('[data-testid="save-date-button"]').click();
      cy.get('[data-testid="editor-save-button"]').click();
      cy.get('.Y9J4BArcarEAX9 > .nch-icon > [data-testid="CloseIcon"]').click();
      cy.wait(2000);
      //ajoute le couleur
      cy.contains(cardData[0].title).click();
      cy.wait(2000);
      cy.get('[data-testid="card-back-labels-button"]').click();
      cy.get('[data-color="orange"]').click();
      cy.wait(5000);
      cy.get('[data-testid="card-back-labels-container"]')
        .get(".color-blind-pattern-orange")
        .should("be.visible");
      cy.get('.Y9J4BArcarEAX9 > .nch-icon > [data-testid="CloseIcon"]').click();
    });
  });
});
