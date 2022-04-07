// WRITE TESTS HERE


describe('Page', () => {
  before(() => {
    cy.visit('/');
  });

  it('should contain 42 items', () => {
    cy.get('.itemNumber').should('contain', 42)
  });

  it('should contain 1-5 items by default', () => {
    cy.get('.itemNumber').should('contain', 5)
    cy.get('.itemNumber').should('contain', 1)
  });

  it ('should be highlighted the button of the first page by default', () => {
    cy.get('[value="1"]').should('have.class', 'active')
  })

  it ('should display 3 page after click on the button [3]', () => {
    cy.get('[value="3"]').click()
    cy.get('[value="3"]').should('have.class', 'active')
    cy.get('.itemNumber').should('contain', 15)
  })

  it('should display the next page after click on the button [Next]', () => {
    cy.reload()
    cy.get('[type="button"]').contains('Next')
      .click()
    cy.get('[value="2"]').should('have.class', 'active')
    cy.get('.itemNumber').should('contain', 10)
  })

  it('should select 10 items for displaying from the list', () => {
    cy.get('select').select('10')
    cy.get('.itemNumber').should('contain', 10)
  })

  it('should display the previous page after click on the button [Previous]', () => {
      cy.reload()
      cy.get('[value="7"]').click()
      cy.get('[type="button"]').contains('Previous')
        .click()
      cy.get('[value="6"]').should('have.class', 'active')
      cy.get('.itemNumber').should('contain', 30)
    })
  
  });
 
