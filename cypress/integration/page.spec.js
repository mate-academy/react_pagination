// WRITE TESTS HERE

const { Children } = require("react");

describe('Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const page = {
    getPage(value) {
      return cy.get('.pagination')
               .contains(`${value}`);
  }
  };

  it('should contain 42 items', () => {
    cy.getByDataCy('info')
      .should('contain', 42);
  });

  it('should contain 1-5 items by default', () => {
    cy.getByDataCy('info')
      .should('contain', 5);
    cy.getByDataCy('info')
      .should('contain', 1);
  });

  it ('should highlight the button of the first page by default', () => {
    cy.get('.pagination').contains('1')
      .should('have.class', 'active');
  });

  it ('should display 3 page after click on the button [3]', () => {
    page.getPage('3')
      .click();
    page.getPage('3')
      .should('have.class', 'active');
    cy.getByDataCy('info')
      .should('contain', 15);
  });

  it('should display the next page after click on the button [Next]', () => {
    page.getPage('Next')
      .click();
    page.getPage('2')
      .should('have.class', 'active');
    cy.getByDataCy('info')
      .should('contain', 10);
  });

  it('should select 10 items for displaying from the list', () => {
    cy.get('select')
      .select('10');
    cy.getByDataCy('info')
      .should('contain', 10);
  });

  it('should display the previous page after click on the button [Previous]', () => {
    page.getPage('7')
      .click();
    page.getPage('Previous')
      .click();
    page.getPage('6')
      .should('have.class', 'active');
    cy.getByDataCy('info')
      .should('contain', 30);
  });

  it('Should be disable buttons if a move is not possible now', () => {
    page.getPage('Previous')
      .should('be.disabled');
    page.getPage('9')
      .click();
    page.getPage('Next')
      .should('be.disabled');
  });
});
