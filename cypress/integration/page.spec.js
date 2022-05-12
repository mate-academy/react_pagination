// WRITE TESTS HERE

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

  it('should highlight the button of the first page by default', () => {
    cy.get('.pagination').contains('1')
      .should('have.class', 'active');
  });

  it('should display 9 page after click on the button [9]', () => {
    page.getPage('9')
      .click();
    page.getPage('9')
      .should('have.class', 'active');
  });

  it('should display the next page after click on the button [»]', () => {
    page.getPage('»')
      .click();
    page.getPage('2')
      .should('have.class', 'active');
  });

  it('should select 10 items for displaying from the list', () => {
    cy.get('select')
      .select('10');
    page.getPage('5')
      .click();
    page.getPage('»')
      .should('be.disabled');
  });

  it('should select 3 items for displaying from the list', () => {
    cy.get('select')
      .select('3');
    page.getPage('14')
      .click();
    page.getPage('»')
      .should('be.disabled'); 
  });

  it('should select 20 items for displaying from the list', () => {
    cy.get('select')
      .select('20');
    page.getPage('3')
      .click();
    page.getPage('»')
      .should('be.disabled');
  });

  it('should display the previous page after click on the button [«]', () => {
    page.getPage('9')
      .click();
    page.getPage('«')
      .click();
    page.getPage('8')
      .should('have.class', 'active');
  });

  it('should disable buttons if a move is not possible', () => {
    page.getPage('«')
      .should('be.disabled');
    page.getPage('9')
      .click();
    page.getPage('»')
      .should('be.disabled');
  });

  it('should hide buttons', () => {
   cy.get('.pagination')
     .children()
     .should('contain', '...');
  });
});
