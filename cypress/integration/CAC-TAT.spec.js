//<reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it.only("preenche os campos obrigatórios e envia o formulário", function () {
    const longText = "teste testetestetestetestetestetestetestetestetesteteste";
    cy.get("#firstName").type("Eddie");
    cy.get("#lastName").type("Sousa");
    cy.get("#email").type("edy@teste.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get('button[type="submit"]').click();

    cy.get(".success").should("be.visible");
  });
});
