/**
 * Suite de automatización E2E – Sauce Demo
 * Autor: [Tu Nombre] – QA Analyst
 *
 * Cubre el flujo crítico de negocio: Login -> Agregar producto -> Checkout -> Confirmación
 * Framework: Cypress
 *
 * Para correr: npx cypress run --spec "cypress/e2e/checkout.cy.js"
 */

describe('Sauce Demo - Flujo de compra completo', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
  });

  it('TC-001: Login exitoso con usuario estándar', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
  });

  it('TC-002: Login bloqueado con usuario lockeado', () => {
    cy.get('#user-name').type('locked_out_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'this user has been locked out');
  });

  it('TC-011: Completar una compra de punta a punta', () => {
    // Login
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Agregar producto al carrito
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');

    // Ir al carrito
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.contains('Sauce Labs Backpack').should('be.visible');

    // Checkout
    cy.get('[data-test="checkout"]').click();
    cy.get('#first-name').type('Juan');
    cy.get('#last-name').type('Perez');
    cy.get('#postal-code').type('3400');
    cy.get('[data-test="continue"]').click();

    // Confirmar resumen y finalizar
    cy.get('.summary_info').should('be.visible');
    cy.get('[data-test="finish"]').click();

    // Validar confirmación
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
  });

  it('TC-012: Bloquea el checkout si falta el First Name', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();

    // Dejamos First Name vacío a propósito
    cy.get('#last-name').type('Perez');
    cy.get('#postal-code').type('3400');
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'First Name is required');
  });

});
