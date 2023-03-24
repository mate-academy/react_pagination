const page = {
  info: () => cy.get('[data-cy="info"]'),
  items: () => cy.get('[data-cy="item"]'),
  perPageSelector: () => cy.get('[data-cy="perPageSelector"]'),
  prevLink: () => cy.get('[data-cy="prevLink"]'),
  nextLink: () => cy.get('[data-cy="nextLink"]'),
  links: () => cy.get('[data-cy="pageLink"]'),
  link: (pageNumber) => page.links().contains(pageNumber),
  assertLinkActive: (pageNumber) => {
    page.link(pageNumber)
      .parent()
      .should('have.class', 'active');
  },
  assertLinkNotActive: (pageNumber) => {
    page.link(pageNumber)
      .parent()
      .should('not.have.class', 'active');
  },
  assertPrevEnabled: () => {
    page.prevLink()
      .parent()
      .should('not.have.class', 'disabled');

    page.prevLink()
      .should('not.have.attr', 'aria-disabled', 'true');
  },
  assertPrevDisabled: () => {
    page.prevLink()
      .parent()
      .should('have.class', 'disabled');

    page.prevLink()
      .should('have.attr', 'aria-disabled', 'true');
  },
  assertNextEnabled: () => {
    page.nextLink()
      .parent()
      .should('not.have.class', 'disabled');

    page.nextLink()
      .should('not.have.attr', 'aria-disabled', 'true');
  },
  assertNextDisabled: () => {
    page.nextLink()
      .parent()
      .should('have.class', 'disabled');

    page.nextLink()
      .should('have.attr', 'aria-disabled', 'true');
  },
};

describe('Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Defaults', () => {
    it('should have all required element', () => {
      page.info().should('exist');
      page.perPageSelector().should('exist');
      page.link(1).should('exist');
      page.prevLink().should('exist');
      page.nextLink().should('exist');
    });

    it('should highlight only the 1st page by default', () => {
      page.assertLinkActive(1);
      page.assertLinkNotActive(2);
      page.assertLinkNotActive(9);
    });

    it('should have 5 items per page by default', () => {
      page.perPageSelector()
        .should('have.value', 5);
    });

    it('should show the default info', () => {
      page.info()
        .should('have.text', 'Page 1 (items 1 - 5 of 42)')
    });

    it('should have 9 pages by default', () => {
      page.links()
        .should('have.length', 9);

      page.links()
        .first()
        .should('have.text', '1');

      page.links()
        .last()
        .should('have.text', '9')
    });

    it('should show 5 first items by default', () => {
      page.items()
        .should('have.length', 5);

      page.items()
        .first()
        .should('have.text', 'Item 1');

      page.items()
        .last()
        .should('have.text', 'Item 5');
    });

    it('should highlight the 2nd page after clicking the 2nd link', () => {
      page.link(2).click();

      page.assertLinkActive(2);
    });
  });

  describe('', () => {
    it('should higlight only a selected page', () => {
      page.link(2).click();

      page.assertLinkActive(2);
      page.assertLinkNotActive(1);
      page.assertLinkNotActive(3);
      page.assertLinkNotActive(9);
    });

    it('should show selected page items', () => {
      page.link(2).click();

      page.items()
        .should('have.length', 5);

      page.items()
        .first()
        .should('have.text', 'Item 6');

      page.items()
        .last()
        .should('have.text', 'Item 10');
    });

    it('should show last page items', () => {
      page.link(9).click();

      page.items()
        .should('have.length', 2);

      page.items()
        .first()
        .should('have.text', 'Item 41');

      page.items()
        .last()
        .should('have.text', 'Item 42');
    });
  });

  describe('PerPage selelector', () => {
    it('should allow to select any per page from the list', () => {
      page.perPageSelector()
        .select('3')
        .should('have.value', 3)
        .select('20')
        .should('have.value', 20)
        .select('10')
        .should('have.value', 10)
        .select('5')
        .should('have.value', 5)
    });

    it('should set 1st page on change', () => {
      page.link(8)
        .click();

      page.perPageSelector()
        .select('10');

      page.assertLinkActive(1);
    });

    it('should show required items', () => {
      page.perPageSelector()
        .select('20');

      page.items()
        .should('have.length', 20);
      page.items()
        .first()
        .should('have.text', 'Item 1');

      page.items()
        .last()
        .should('have.text', 'Item 20');
    });

    it('should show required links', () => {
      page.perPageSelector()
        .select('10');

      page.links()
        .should('have.length', 5);

      page.links()
        .first()
        .should('have.text', '1');

      page.links()
        .last()
        .should('have.text', '5');
    });

    it('should change the tile accordingly to the new perPage', () => {
      page.perPageSelector()
        .select('20');

      page.info()
        .should('have.text', 'Page 1 (items 1 - 20 of 42)');

      page.link(2)
        .click();

      page.info()
        .should('have.text', 'Page 2 (items 21 - 40 of 42)');

      page.link(3)
        .click();

      page.info()
        .should('have.text', 'Page 3 (items 41 - 42 of 42)');
    });
  });

  describe('Prev link', () => {
    it('should be disabled by default', () => {
      page.assertPrevDisabled();
    });

    it('should be enabled if the 1st page is not selected', () => {
      page.link(2).click();

      page.assertPrevEnabled();

      page.link(9).click();

      page.assertPrevEnabled();
    });

    it('should be disabled when the 1st page is selected', () => {
      page.link(2).click();
      page.link(1).click();

      page.assertPrevDisabled();
    });

    it('should open prev page is current page is not the 1st', () => {
      page.link(9).click();

      page.prevLink().click();
      page.assertLinkActive(8);

      page.prevLink().click();
      page.assertLinkActive(7);

      page.prevLink().click();
      page.assertLinkActive(6);
    });

    it('should not change the page if it is already the 1st', () => {
      page.link(2).click();
      page.link(1).click();

      page.prevLink().click({ force: true })
      page.assertLinkActive(1);
    });
  });

  describe('Next link', () => {
    it('should be enabled by default', () => {
      page.assertNextEnabled();
    });

    it('should be enabled if the last page is not selected', () => {
      page.link(2).click();
      page.assertNextEnabled();

      page.link(8).click();
      page.assertNextEnabled();
    });

    it('should be disabled when the last page is selected', () => {
      page.link(9).click();
      page.assertNextDisabled();
    });

    it('should open next page is current page is not the last', () => {
      page.link(2).click();

      page.nextLink().click();
      page.assertLinkActive(3);

      page.nextLink().click();
      page.assertLinkActive(4);

      page.nextLink().click();
      page.assertLinkActive(5);
    });

    it('should not change the page if it is already the last', () => {
      page.link(9).click();

      page.nextLink().click({ force: true })
      page.assertLinkActive(9);
    });
  });
});
