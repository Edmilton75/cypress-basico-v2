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
    cy.get("#phone-checkbox").check();
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

  it("seleciona um produto (YouTube) por seu texto", function () {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Metoria) por seu valor (value)", function () {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", function () {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get("input[type=radio][value=feedback]")
      .check()
      .should("have.value", "feedback");
  });

  it("marca cada tipo de atendimento", function () {
    cy.get("input[type=radio]")
      .should("have.length", 3)
      .each(($radio) => {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });

  it("seleciona um arquivo da pasta fixtures", function () {
    cy.get("input[type='file']")
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("Selecione um arquivo simulando Drag-drop", function () {
    cy.get("input[type=file]")
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function () {
    cy.fixture("example.json").as("samplefile");
    cy.get("input[type=file]")
      .selectFile("@samplefile")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function () {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", function () {
    cy.get("#privacy a").invoke("removeAttr", "target").click();

    cy.contains("Talking About Testing").should("be.visible");
  });
});
