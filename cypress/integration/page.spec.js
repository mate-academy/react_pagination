// WRITE TESTS HERE

const { Children } = require("react");


describe('Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

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

  it ('should be highlighted the button of the first page by default', () => {
    cy.get('.pagination')
      .contains('1')
      .should('have.class', 'active')
  });

  it ('should display 3 page after click on the button [3]', () => {
    cy.get('.pagination')
      .contains('3')
      .click();
    cy.get('.pagination')
      .contains('3')
      .should('have.class', 'active');
    cy.getByDataCy('info')
      .should('contain', 15);
  });

  it('should display the next page after click on the button [Next]', () => {
    cy.get('.pagination')
      .contains('Next')
      .click();
    cy.get('.pagination')
      .contains('2')
      .should('have.class', 'active');
    cy.getByDataCy('info')
      .should('contain', 10);
  })

  it('should select 10 items for displaying from the list', () => {
    cy.get('select')
      .select('10');
    cy.getByDataCy('info')
      .should('contain', 10);
  })

  it('should display the previous page after click on the button [Previous]', () => {
      cy.get('.pagination')
        .contains('7')
        .click();
      cy.get('.pagination')
        .contains('Previous')
        .click();
      cy.get('.pagination')
        .contains('6')
        .should('have.class', 'active');
      cy.getByDataCy('info')
        .should('contain', 30);
    });
  });
