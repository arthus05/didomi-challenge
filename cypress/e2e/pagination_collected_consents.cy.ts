describe('Pagination on Collected Consents Page', () => {
  beforeEach(() => {
    // Navigate to the "Collected consents" page
    cy.visit('/')
    cy.contains('.sidebar__list-item button', 'Collected consents').click()
    cy.url().should('include', '/consents')
  })

  it('should display consents with working pagination', () => {
    // Initial mock data: Bojack, Princess Carolyn, John Doe
    // Items per page: 2

    // Page 1 assertions
    cy.get('.consents__table tbody tr').should('have.length', 2)
    cy.contains('td', 'Bojack Horseman').should('be.visible')
    cy.contains('td', 'Princess Carolyn').should('be.visible')
    cy.contains('td', 'John Doe').should('not.exist') // Not on the first page

    // Verify pagination controls are shown
    cy.get('.consents__paging-buttons').should('be.visible')
    cy.contains('.consents__paging-buttons span', 'Next page > >').should('be.visible')
    cy.contains('.consents__paging-buttons span', '< < Previous page').should('be.visible')
    cy.contains('.consents__paging-buttons--numbers span', '1').should('be.visible')
    cy.contains('.consents__paging-buttons--numbers span', '2').should('be.visible')

    // Click "Next page"
    cy.contains('.consents__paging-buttons span', 'Next page > >').should('be.visible').click()
    cy.get('.consents__table tbody tr').should('have.length', 1)
    cy.contains('td', 'John Doe').should('be.visible')
    cy.contains('td', 'Bojack Horseman').should('not.exist')

    // "Next page" might be less visible or disabled here if it's the last page.
    // Your current implementation keeps it visible and clickable.
    // prevPageButton should now be fully active for navigation.

    // Click a page number (Page 1)
    cy.contains('.consents__paging-buttons--numbers span', '1').click()
    cy.get('.consents__table tbody tr').should('have.length', 2)
    cy.contains('td', 'Bojack Horseman').should('be.visible')
    cy.contains('td', 'Princess Carolyn').should('be.visible')

    // Click "Previous page" (should not change from page 1 if already there, or test boundary)
    // To test prevPageButton properly, go to page 2 first
    cy.contains('.consents__paging-buttons--numbers span', '2').click()
    cy.contains('td', 'John Doe').should('be.visible') // Now on page 2
    cy.contains('.consents__paging-buttons span', '< < Previous page').click()
    cy.get('.consents__table tbody tr').should('have.length', 2)
    cy.contains('td', 'Bojack Horseman').should('be.visible')

    // Verify "Previous page" and "Next page" buttons enable/disable correctly at boundaries
    // (Your current custom pagination does not visually disable them, but prevents action via onPageChange logic)
    // On page 1:
    cy.contains('.consents__paging-buttons span', '< < Previous page').click() // Click previous on page 1
    cy.contains('td', 'Bojack Horseman').should('be.visible') // Still on page 1

    // Go to last page (Page 2)
    cy.contains('.consents__paging-buttons--numbers span', '2').click()
    cy.contains('td', 'John Doe').should('be.visible')
    cy.contains('.consents__paging-buttons span', 'Next page > >').click() // Click next on page 2 (last page)
    cy.contains('td', 'John Doe').should('be.visible') // Still on page 2
  })
})
