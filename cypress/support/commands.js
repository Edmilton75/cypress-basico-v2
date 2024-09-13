Cypress.Commands.add("filMandatoryFieldsAndSubmit", function () {
  const longText = "teste testetestetestetestetestetestetestetestetesteteste";
  cy.get("#firstName").type("Eddie");
  cy.get("#lastName").type("Sousa");
  cy.get("#email").type("edy@teste.com");
  cy.get("#open-text-area").type(longText, { delay: 0 });
  cy.contains("button", "Enviar").click();
});
