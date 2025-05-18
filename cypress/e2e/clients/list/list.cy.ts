/// <reference types="cypress" />

describe('Comprueba que el listado de clientes se carga correctamente.', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/v1/clients').as('getClients');
    });
  
    it("Obtener el listado completo de clientes", () => {
      cy.viewport(1900, 1200);
      cy.visit('/clients/list');
  
      cy.wait('@getClients').then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
        return expect(interception.response?.body).to.be.an('array').and.not.be.empty;
      });
    });
  });
  