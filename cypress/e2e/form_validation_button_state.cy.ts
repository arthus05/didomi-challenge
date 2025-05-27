describe('Form Validation and Button State on Give Consent Page', () => {
  beforeEach(() => {
    cy.visit('/') // Navigates to /give-consent
    cy.url().should('include', '/give-consent')
  })

  it('should correctly manage the "Give consent" button state', () => {
    // Verify the submit button is initially disabled
    cy.get('button[type="submit"]').should('be.disabled')

    // Fill in name and email, button should still be disabled
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('button[type="submit"]').should('be.disabled')

    // Select a consent
    cy.get('input[value="Receive newsletter"]').check()

    // Verify the button becomes enabled
    cy.get('button[type="submit"]').should('not.be.disabled')

    // Select another consent, button remains enabled
    cy.get('input[value="Be shown targeted ads"]').check()
    cy.get('button[type="submit"]').should('not.be.disabled')

    // Deselect one consent, button remains enabled
    cy.get('input[value="Receive newsletter"]').uncheck()
    cy.get('button[type="submit"]').should('not.be.disabled')

    // Deselect all consents
    cy.get('input[value="Be shown targeted ads"]').uncheck()

    // Verify the button becomes disabled again
    cy.get('button[type="submit"]').should('be.disabled')
  })
})
