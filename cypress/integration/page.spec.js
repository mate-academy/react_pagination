// WRITE TESTS HERE

const { Children } = require("react");


describe('Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should contain 42 items', () => {
    cy.get('p').should('contain', 42)
  });

  it('should contain 1-5 items by default', () => {
    cy.get('p').should('contain', 5)
    cy.get('p').should('contain', 1)
  });

  it ('should be highlighted the button of the first page by default', () => {
    cy.get('button').contains('1').should('have.class', 'active')
  })

  it ('should display 3 page after click on the button [3]', () => {
    cy.get('button').contains('3').click()
    cy.get('button').contains('3').should('have.class', 'active')
    cy.get('p').should('contain', 15)
  })

  it('should display the next page after click on the button [Next]', () => {
    cy.get('button').contains('Next')
      .click()
    cy.get('button').contains('2').should('have.class', 'active')
    cy.get('p').should('contain', 10)
  })

  it('should select 10 items for displaying from the list', () => {
    cy.get('select').select('10')
    cy.get('p').should('contain', 10)
  })

  it('should display the previous page after click on the button [Previous]', () => {
      cy.get('button').contains('7').click()
      cy.get('button').contains('Previous')
        .click()
      cy.get('button').contains('6').should('have.class', 'active')
      cy.get('p').should('contain', 30)
    })
  
  });
 
