describe('Successful Consent Submission Flow', () => {
  const userName = 'Cypress Test User'
  const userEmail = 'cypress@example.com'
  const selectedConsentsText = 'Receive newsletter, Be shown targeted ads' // Match the order and text

  beforeEach(() => {
    cy.visit('/') // Navigates to /give-consent due to App.tsx redirect
    cy.url().should('include', '/give-consent')
  })

  it('should allow a user to fill the form, submit, and see the consent collected', () => {
    // Initial mock data: Bojack, Princess Carolyn, John Doe
    // Items per page: 2

    // Fill in the name and email
    cy.get('input[name="name"]').type(userName)
    cy.get('input[name="email"]').type(userEmail)

    // Select one or more consent options
    cy.get('input[value="Receive newsletter"]').check()
    cy.get('input[value="Be shown targeted ads"]').check() // Example of multiple selections

    // Click "Give consent"
    cy.get('button[type="submit"]').click()

    // Verify the success alert/message appears
    cy.on('window:alert', str => {
      expect(str).to.equal('Consent submitted successfully!')
    })

    // Verify navigation to the "Collected consents" page
    cy.url().should('include', '/consents')

    cy.contains('.consents__paging-buttons--numbers span', '2').click()

    // Verify the newly added consent (with the correct data) is in the table
    cy.contains('td', userName, { timeout: 10000 }) // Wait for the table to update
      .should('be.visible')
      .parent('tr') // Get the <tr> element
      .within(() => {
        cy.contains('td', userEmail).should('be.visible')
        cy.contains('td', selectedConsentsText).should('be.visible')
      })

    // Bonus: Verify form fields on /give-consent are cleared if we navigate back
    cy.contains('.sidebar__list-item button', 'Give consent').click() // Navigate back using sidebar
    cy.url().should('include', '/give-consent')

    cy.get('input[name="name"]').should('have.value', '')
    cy.get('input[name="email"]').should('have.value', '')
    cy.get('input[value="Receive newsletter"]').should('not.be.checked')
    cy.get('input[value="Be shown targeted ads"]').should('not.be.checked')
  })
})
