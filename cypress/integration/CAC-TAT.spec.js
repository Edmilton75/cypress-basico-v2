//<reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(function () {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", function () {
    const longText = "teste testetestetestetestetestetestetestetestetesteteste";
    cy.get("#firstName").type("Eddie");
    cy.get("#lastName").type("Sousa");
    cy.get("#email").type("edy@teste.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    const longTexte =
      "teste testetestetestetestetestetestetestetestetesteteste";
    cy.get("#firstName").type("Eddie");
    cy.get("#lastName").type("Sousa");
    cy.get("#email").type("edteste.com");
    cy.get("#open-text-area").type(longTexte, { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("campo de telefone continua vazio, quando preenchido com valor nao numerico", function () {
    cy.get("#phone").type("edmi").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    const longTexte =
      "teste testetestetestetestetestetestetestetestetesteteste";
    cy.get("#firstName").type("Eddie");
    cy.get("#lastName").type("Sousa");
    cy.get("#phone");
    cy.get("#email").type("edteste@teste.com");
    cy.get("#phone-checkbox").click();
    cy.get("#open-text-area").type(longTexte, { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("Eddy")
      .should("have.value", "Eddy")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Sousa")
      .should("have.value", "Sousa")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("eddy@teste.com")
      .should("have.value", "eddy@teste.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("1234567890")
      .should("have.value", "1234567890")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });
  7;

  it("Envia o formulário com sucesso usando um comando customizado", function () {
    cy.filMandatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");
  });
});
