describe("Connexion", () => {
  beforeEach(() => {
      cy.visit("https://trello.com");
      cy.contains("Log in").click();
      cy.wait(5000);
  });

  it.skip("Connexion sans email", () => {
      // LOGIN
      cy.origin("https://id.atlassian.com", () => {
        cy.get("#login-submit").click();
        cy.get("#username-uid2-error").should("be.visible").and("contain.text","Saisissez une adresse e-mail");
        cy.get('[data-invalid="true"]').should("be.visible");
      });
  });

  it.skip("Connexion sans mot de passe", () => {
    // LOGIN
    cy.origin("https://id.atlassian.com", () => {
      cy.get("#username").type("wcsgroupe@gmail.com");
      cy.get("#login-submit").click();
      cy.wait(5000);
      cy.get("#login-submit").click();
      cy.get("#password-uid3-error").should("be.visible").and("contain.text", "Saisissez votre mot de passe");
      cy.get('[data-invalid="true"]').should("be.visible");
    });
  });

  it.skip("Connexion email erroné et bon mot de passe", () => {
    // LOGIN
    cy.origin("https://id.atlassian.com", () => {
      cy.get("#username").type("wcsgrou@gmail.com");
      cy.get("#login-submit").click();
      cy.wait(5000);
      cy.get("#password").type("Groupe3wcs.");
      cy.get("#login-submit").click();
      cy.get('[data-testid="form-error"]').should("be.visible").and("contain.text", "Adresse e-mail et/ou mot de passe incorrects.");
    });
  });

  it.skip("Connexion email ok et mot de passe erroné", () => {
    // LOGIN
    cy.origin("https://id.atlassian.com", () => {
      cy.get("#username").type("wcsgroupe@gmail.com");
      cy.get("#login-submit").click();
      cy.wait(5000);
      cy.get("#password").type("Groupe3");
      cy.get("#login-submit").click();
      cy.get('[data-testid="form-error"]').should("be.visible").and("contain.text", "Adresse e-mail et/ou mot de passe incorrects.");
    });
  });
});

describe("Choix de la forme de création du tableau", () => {
  it.skip("Ouvrir la modal de création de tableau", () => {
      cy.visit("https://trello.com");
      cy.contains("Log in").click();
      cy.wait(5000);
  
      // LOGIN
      cy.origin("https://id.atlassian.com", () => {
        cy.get("#username").type("wcsgroupe@gmail.com");
        cy.get("#login-submit").click();
        cy.wait(5000);
        cy.get("#password").type("Groupe3wcs.");
        cy.get("#login-submit").click();
      });

      cy.url().should('include', '/boards');
      cy.get('[data-testid="header-create-menu-button"]').click();
      cy.get('[data-testid="header-create-menu-popover"]').should("be.visible");
  });
});

describe("Création d'un tableau", () => {
  it.skip("Créer un tableau par la modal du header", () => {
    cy.visit("https://trello.com");
        cy.contains("Log in").click();
        cy.wait(5000);
    
    // LOGIN
    cy.origin("https://id.atlassian.com", () => {
      cy.get("#username").type("wcsgroupe@gmail.com");
      cy.get("#login-submit").click();
      cy.wait(5000);
      cy.get("#password").type("Groupe3wcs.");
      cy.get("#login-submit").click();
    });

    cy.url().should('include', '/boards');
    cy.get('[data-testid="header-create-menu-button"]').click();
    cy.get('[data-testid="header-create-menu-popover"]').should("be.visible");
    cy.get('[data-testid="header-create-board-button"]').click();
    cy.get('[data-testid="header-create-menu-popover"]').should("be.visible").and("contain.text", "Créer un tableau");
    cy.get('#background-picker > ul').eq(1).click();
    cy.get('[data-testid="CheckIcon"]').should("be.visible");
    cy.get('[data-testid="create-board-title-input"]').type("Title test2");
    cy.get('[data-testid="create-board-submit-button"]').click();
    cy.url().should("include","/title-test2");
  });
});

describe("Modifier une image de couverture", () => {
  beforeEach(() => {
    cy.visit("https://trello.com");
    cy.contains("Log in").click();
    cy.wait(5000);

    // LOGIN
    cy.origin("https://id.atlassian.com", () => {
      cy.get("#username").type("wcsgroupe@gmail.com");
      cy.get("#login-submit").click();
      cy.wait(5000);
      cy.get("#password").type("Groupe3wcs.");
      cy.get("#login-submit").click();
    });
  });

  it.skip("Changer la couverture par une image pré-sélectionnée", () => {
    cy.url().should("include", "/boards");
    cy.get('[href="/b/t4DeGuod/title-test"]').click();
    cy.wait(3000);
    cy.url().should("includes", "/title-test");
    cy.contains("Test carte").click();
    cy.wait(5000);
    cy.get('[aria-modal="true"]').should("be.visible");
    cy.get('[data-testid="card-back-cover-button"]').click();
    cy.wait(5000);
    cy.get(".pop-over").should("be.visible");
    cy.get('[data-testid="card-cover-color-option-blue"]').click();
    cy.wait(2000);
    cy.get('[data-testid="popover-close"]').click();
    cy.wait(3000);
    cy.get('[aria-label="Fermer la boîte de dialogue"]').click();
    cy.wait(2000);
  });

  it.skip("Changer la couverture par une image recherchée", () => {
    cy.url().should("include", "/boards");
    cy.get('[href="/b/t4DeGuod/title-test"]').click();
    cy.wait(3000);
    cy.url().should("includes", "/title-test");
    cy.contains("Test carte 2").click();
    cy.wait(5000);
    cy.get('[aria-modal="true"]').should("be.visible");
    cy.get('[data-testid="card-back-cover-button"]').click();
    cy.wait(5000);
    cy.get(".pop-over").should("be.visible");
    cy.contains("Rechercher des photos").click();
    cy.wait(3000);
    cy.contains("Animaux (Animal)").click();
    cy.wait(3000);
    cy.get("h4").should("contain.text", "Résultats").should("be.visible");
    cy.get('[href="https://unsplash.com/@rayhennessy?utm_source=trello&utm_medium=referral&utm_campaign=api-credit"]').parent().parent().click();
    cy.wait(3000);
    cy.get("h4").should("contain.text", "Taille").should("be.visible");
    cy.get('[data-testid="popover-close"]').click();
    cy.wait(2000);
    cy.get('[aria-label="Fermer la boîte de dialogue"]').click();
    cy.wait(2000);
  });
});

