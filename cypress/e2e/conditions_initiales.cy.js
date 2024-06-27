describe("Conditions Initiales", () => {
    before(() => {
        cy.visit("https://trello.com");
        cy.contains("Log in").click();
        cy.wait(5000);

        // LOGIN
        cy.origin("https://id.atlassian.com", () => {
        cy.get("#username").type("wcsgroupe@gmail.com");
        cy.get("#login-submit").click();
        cy.get("#password").type("Groupe3wcs.");
        cy.get("#login-submit").click();
        });
    });

    it("Get vérification de la présence des listes", () => {
        cy.get('[href="/b/KGnZspVf/test-conditions-intiales"]').click();
        cy.wait(3000);

        const idBoard = Cypress.env('ID_BOARD');
        const apiKey = Cypress.env('API_KEY');
        const token = Cypress.env('TOKEN');

        expect(idBoard, "ID_BOARD is defined").to.be.a('string');
        expect(apiKey, "API_KEY is defined").to.be.a('string');
        expect(token, "TOKEN is defined").to.be.a('string');

        cy.request({
            method: 'GET', 
            url: `https://api.trello.com/1/boards/${idBoard}/lists/?key=${apiKey}&token=${token}`
        })
        .then((response) => {
            expect(response.status).eq(200);
            console.log(response.body);
            cy.log(JSON.stringify(response.body));
            cy.wait(3000);

            const listsData = response.body;

            expect(listsData[0]).to.have.property('name', 'Backlog');
            expect(listsData[1]).to.have.property('name', 'To Do');
            expect(listsData[2]).to.have.property('name', 'In Progress');
            expect(listsData[3]).to.have.property('name', 'In Review');
            expect(listsData[4]).to.have.property('name', 'Done');

            cy.fixture("cardData").then((cardData) => {
                /* Ajouter les cartes */
                cardData.forEach((card) => {
                  cy.contains("Ajouter une carte").click();
                  cy.get('[data-testid="list-card-composer-textarea"]').type(card.title);
                });
          
                // Ajouter la description pour chaque carte
                cardData.forEach((card) => {
                  cy.contains(card.title).click();
                  cy.wait(5000);
                  cy.get(
                    '[aria-label="Zone de contenu principale, commencez à taper pour saisir du texte."]'
                  ).type(card.description);
                  cy.get('[data-testid="editor-save-button"]').click();
                  cy.get('[aria-label="Fermer la boîte de dialogue"]').click();
                });
          
                // Déplacer les cartes
                cardData.forEach((card) => {
                  cy.contains(card.title)
                    .parents("li")
                    .then(($cardElement) => {
                      cy.contains(card.migrate)
                        .parents("li")
                        .then(($listElement) => {
                          cy.wrap($cardElement).drag($listElement, { force: true });
                        });
                    });
                });
            });

        });
    });



});