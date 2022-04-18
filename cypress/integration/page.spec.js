// WRITE TESTS HERE


describe('Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should contain 42 items', () => {
    cy.get('[value="9"]').click()
    cy.get('p').should('contain', '42 of 42')
  });

  it('should contain 1-5 items by default', () => {
    cy.get('[value="1"]').click()
    cy.get('p').should('contain', 5)
    cy.get('p').should('contain', 1)
  });

  it ('should be highlighted the button of the first page by default', () => {
    cy.get('[value="1"]').should('have.class', 'active')
  });

  it ('should display 3 page after click on the button [3]', () => {
    cy.get('[value="3"]').click()
    cy.get('[value="3"]').should('have.class', 'is-active')
    cy.get('p').should('contain', 15)
  });

  it('should display the next page after click on the button [Next]', () => {
    cy.get('[type="button"]').contains('Next')
      .click()
    cy.get('[value="2"]').should('have.class', 'is-active')
    cy.get('p').should('contain', 10)
  });

  it('should select 10 items for displaying from the list', () => {
    cy.get('select').select('10')
    cy.get('p').should('contain', 10)
  });

  it('should display the previous page after click on the button [Previous]', () => {
      cy.get('[value="7"]').click()
      cy.get('[type="button"]').contains('Previous')
        .click()
      cy.get('[value="6"]').should('have.class', 'is-active')
      cy.get('p').should('contain', 30)
  });
  });
  