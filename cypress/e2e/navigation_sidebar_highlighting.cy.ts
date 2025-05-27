describe('Navigation and Sidebar Highlighting', () => {
  it('should navigate between pages using the sidebar and highlight the active link', () => {
    // Initial state: /give-consent page after redirect from "/"
    cy.visit('/')
    cy.url().should('include', '/give-consent')

    // Check highlighting on /give-consent
    cy.get('.sidebar__list-item a[href="/give-consent"] button').should(
      'have.css',
      'background-color',
      'rgb(223, 232, 250)',
    )
    cy.get('.sidebar__list-item a[href="/consents"] button').should(
      'not.have.css',
      'background-color',
      'rgb(223, 232, 250)',
    )

    // Navigate to Collected Consents
    cy.contains('.sidebar__list-item button', 'Collected consents').click()
    cy.url().should('include', '/consents')

    // Check highlighting on /consents
    cy.get('.sidebar__list-item a[href="/consents"] button').should(
      'have.css',
      'background-color',
      'rgb(223, 232, 250)',
    )
    cy.get('.sidebar__list-item a[href="/give-consent"] button').should(
      'not.have.css',
      'background-color',
      'rgb(223, 232, 250)',
    )

    // Navigate back to Give Consent
    cy.contains('.sidebar__list-item button', 'Give consent').click()
    cy.url().should('include', '/give-consent')

    // Check highlighting on /give-consent again
    cy.get('.sidebar__list-item a[href="/give-consent"] button').should(
      'have.css',
      'background-color',
      'rgb(223, 232, 250)',
    )
  })
})
