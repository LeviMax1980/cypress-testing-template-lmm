    it('cy.writeFile() - write to a .json file', () => {   
   
   // JavaScript arrays and objects are stringified
    // and formatted into text.
    cy.writeFile('cypress/fixtures/profile1.json', {
      id: 1234,
      name: 'Levi',
      surname: 'Maxwell',
      email: 'Levi@example.com',
    })

    cy.fixture('profile1').should((profile) => {
      expect(profile.name).to.eq('Levi')

    console.log(profile);
    })
    })
          it('cy.readFile() - read file contents', () => {
    // https://on.cypress.io/readfile

    // You can read a file and yield its contents
    // The filePath is relative to your project's root.
    cy.readFile(Cypress.config('configFile')).then((config) => {
      expect(config).to.be.an('string')
    })
  })