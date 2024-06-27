describe("projet trello", () => {
    it("Add a board to favorites", () => {
      cy.visit("https://trello.com");
      cy.contains("Log in").click();
  
      // LOGIN
      cy.origin("https://id.atlassian.com", () => {
        cy.get("#username").type("wcsgroupe@gmail.com");
        cy.get("#login-submit").click();
        cy.get("#password").type("Groupe3wcs.");
        cy.get("#login-submit").click();
      });
  
     //add a board to favorites
      cy.wait(3000);
      
      cy.get('[title="Cliquez ici pour ajouter ce tableau aux favoris. Il sera ajouté à votre liste de favoris."]')
      .eq(2)
      .click({force:true});
      cy.wait(2000);
      
    cy.viewport(1200, 720); //change window's size
      cy.get('[data-testid="starred-boards-menu"]').should('have.text','Favoris').click();
      cy.get('[title="tab2"]').should('be.visible')
    });
    
    
    it("follow a card", () => {
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
          //Add cards
          cardData.forEach((card) => {
            cy.contains("Ajouter une carte").click();
            cy.get('[data-testid="list-card-composer-textarea"]').type(card.title);
          });
  
        // Follow a card
        
          cy.wait(3000);
          
          cy.contains(cardData[2].title).click();
          cy.get('[aria-label="Suivre pour recevoir des notifications concernant les mises à jour de cette carte"]').click();
          cy.get('.on').should('be.visible');
          cy.get('[aria-label="Fermer la boîte de dialogue"]').click();
          cy.wait(3000);
          cy.get('[data-testid="SubscribeIcon"]').should('be.visible')
        });
      });


      
        it("archive a card", () => {
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
          cy.fixture("cardData").then((cardData) => {
            //Add cards
            cardData.forEach((card) => {
              cy.contains("Ajouter une carte").click();
              cy.get('[data-testid="list-card-composer-textarea"]').type(card.title);
            });
    
          // Archive a card
            
            cy.contains(cardData[0].title).click();
            cy.get('[data-testid="card-back-archive-button"]').click();
            cy.get('[data-testid="card-back-archive-banner"]').should('have.text','Cette carte est archivée.');
            cy.get('[aria-label="Fermer la boîte de dialogue"]').click();
            cy.wait(3000);
          
        
      });
    });
      
    });
  