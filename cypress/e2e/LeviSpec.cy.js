describe('My First Test', () => {
  it('Gets, types and asserts', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it
    cy.get('.action-email').type('Fake@email.com')

    //  Verify that the value has been updated
    cy.get('.action-email').should('have.value', 'Fake@email.com')

    // .type() with special character sequences
    cy.get('.action-email').type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
    cy.get('.action-email').type('{del}{selectall}{backspace}')

    cy.get('.action-focus').focus()
    cy.get('.action-focus').should('have.class', 'focus')
    cy.get('.action-focus').type('Testing')
    cy.get('.action-focus').should('have.value', 'Testing')

    cy.get('.action-blur').type('About to blur levis test!!')
    cy.get('.action-blur').blur()
    cy.get('.action-blur').should('have.class', 'error')
        .prev().should('have.attr', 'style', 'color: red;')

    cy.get('.action-clear').type('Clear this text')
    cy.get('.action-clear').should('have.value', 'Clear this text')
    cy.get('.action-clear').clear()
    cy.get('.action-clear').should('have.value', '')
    cy.get('.action-clear').type('Clear this text Again!!')
    cy.get('.action-clear').should('have.value', 'Clear this text Again!!')

    cy.get('.action-form')
      .find('[type="text"]').type('HALFOFF')

    cy.get('.action-form').submit()
    cy.get('.action-form').next().should('contain', 'Your form has been submitted!')
    
    cy.get('.action-btn').click()
    cy.get('.popover-content').should('contain', 'This popover shows up on click')
    
    cy.get('#action-canvas').click()

    // You can click on 9 specific positions of an element:
    //  -----------------------------------
    // | topLeft        top       topRight |
    // |                                   |
    // |                                   |
    // |                                   |
    // | left          center        right |
    // |                                   |
    // |                                   |
    // |                                   |
    // | bottomLeft   bottom   bottomRight |
    //  -----------------------------------

    // clicking in the center of the element is the default
    cy.get('#action-canvas').click('topLeft')
    cy.get('#action-canvas').click('top')
    cy.get('#action-canvas').click('topRight')
    cy.get('#action-canvas').click('left')
    cy.get('#action-canvas').click('right')
    cy.get('#action-canvas').click('bottomLeft')
    cy.get('#action-canvas').click('bottom')
    cy.get('#action-canvas').click('bottomRight')


    // .click() accepts an x and y coordinate
    // that controls where the click occurs :)
    cy.get('#action-canvas')
    cy.get('#action-canvas').click(80, 75) // click 80px on x coord and 75px on y coord
    cy.get('#action-canvas').click(170, 75)
    cy.get('#action-canvas').click(80, 165)
    cy.get('#action-canvas').click(100, 185)
    cy.get('#action-canvas').click(125, 190)
    cy.get('#action-canvas').click(150, 185)
    cy.get('#action-canvas').click(170, 165)

    // click multiple elements by passing multiple: true
    cy.get('.action-labels>.label').click({ multiple: true })

    // Ignore error checking prior to clicking
    cy.get('.action-opacity>.btn').click({ force: true })

    // Our app has a listener on 'dblclick' event in our 'scripts.js'
    // that hides the div and shows an input on double click
    cy.get('.action-div').dblclick()
    cy.get('.action-div').should('not.be.visible')
    cy.get('.action-input-hidden').should('be.visible')

    // Our app has a listener on 'contextmenu' event in our 'scripts.js'
    // that hides the div and shows an input on right click
    cy.get('.rightclick-action-div').rightclick()
    cy.get('.rightclick-action-div').should('not.be.visible')
    cy.get('.rightclick-action-input-hidden').clear()
    cy.get('.rightclick-action-input-hidden').type('This is just a test!!')

    // By default, .check() will check all
    // matching checkbox or radio elements in succession, one after another
    cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').check()
    cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').should('be.checked')

    cy.get('.action-radios [type="radio"]').not('[disabled]').check()
    cy.get('.action-radios [type="radio"]').not('[disabled]').should('be.checked')

    // .check() accepts a value argument
    cy.get('.action-radios [type="radio"]').check('radio1')
    cy.get('.action-radios [type="radio"]').should('be.checked')

    // .check() accepts an array of values
    cy.get('.action-multiple-checkboxes [type="checkbox"]').check(['checkbox1', 'checkbox2', 'checkbox3'])
    cy.get('.action-multiple-checkboxes [type="checkbox"]').should('be.checked')

    // Ignore error checking prior to checking
    cy.get('.action-checkboxes [disabled]').check({ force: true })
    cy.get('.action-checkboxes [disabled]').should('be.checked')

    cy.get('.action-radios [type="radio"]').check('radio3', { force: true })
    cy.get('.action-radios [type="radio"]').should('be.checked')

    // at first, no option should be selected
    cy.get('.action-select')
      .should('have.value', '--Select a fruit--')

    // Select option(s) with matching text content
    cy.get('.action-select').select('apples')
    // confirm the apples were selected
    // note that each value starts with "fr-" in our HTML
    cy.get('.action-select').should('have.value', 'fr-apples')

    cy.get('.action-select-multiple')
    .select(['apples', 'oranges', 'bananas'])
    cy.get('.action-select-multiple')
    // when getting multiple values, invoke "val" method first
    .invoke('val')
    .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])

    // Select option(s) with matching value
    cy.get('.action-select').select('fr-bananas')
    cy.get('.action-select')
    // can attach an assertion right away to the element
    .should('have.value', 'fr-bananas')

    cy.get('.action-select-multiple')
    .select(['fr-apples', 'fr-oranges', 'fr-bananas'])
    cy.get('.action-select-multiple')
    .invoke('val')
    .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])

    // assert the selected values include oranges
    cy.get('.action-select-multiple')
    .invoke('val').should('include', 'fr-oranges')

    // normally all of these buttons are hidden,
    // because they're not within
    // the viewable area of their parent
    // (we need to scroll to see them)
    cy.get('#scroll-horizontal button')
      .should('not.be.visible')

    // scroll the button into view, as if the user had scrolled
    cy.get('#scroll-horizontal button').scrollIntoView()
    cy.get('#scroll-horizontal button')
      .should('be.visible')

    cy.get('#scroll-vertical button')
    .should('not.be.visible')

    // Cypress handles the scroll direction needed
    cy.get('#scroll-vertical button').scrollIntoView()
    cy.get('#scroll-vertical button')
    .should('be.visible')

    cy.get('#scroll-both button')
    .should('not.be.visible')

    // Cypress knows to scroll to the right and down
    cy.get('#scroll-both button').scrollIntoView()
    cy.get('#scroll-both button')
    .should('be.visible')


    // You can scroll to 9 specific positions of an element:
    //  -----------------------------------
    // | topLeft        top       topRight |
    // |                                   |
    // |                                   |
    // |                                   |
    // | left          center        right |
    // |                                   |
    // |                                   |
    // |                                   |
    // | bottomLeft   bottom   bottomRight |
    //  -----------------------------------

    // if you chain .scrollTo() off of cy, we will
    // scroll the entire window
    cy.scrollTo('bottom')

    cy.get('#scrollable-horizontal').scrollTo('right')

    // or you can scroll to a specific coordinate:
    // (x axis, y axis) in pixels
    cy.get('#scrollable-vertical').scrollTo(250, 250)

    // or you can scroll to a specific percentage
    // of the (width, height) of the element
    cy.get('#scrollable-both').scrollTo('75%', '25%')

    // control the easing of the scroll (default is 'swing')
    cy.get('#scrollable-vertical').scrollTo('center', { easing: 'linear' })

    // control the duration of the scroll (in ms)
    cy.get('#scrollable-both').scrollTo('center', { duration: 2000 })

    // To interact with a range input (slider)
    // we need to set its value & trigger the
    // event to signal it changed

    // Here, we invoke jQuery's val() method to set
    // the value and trigger the 'change' event
    cy.get('.trigger-input-range')
      .invoke('val', 25)
    cy.get('.trigger-input-range')
      .trigger('change')
    cy.get('.trigger-input-range')
      .get('input[type=range]').siblings('p')
      .should('have.text', '25')
    })

  /* describe('Login Flow', () => {
  it('Logs in with valid credentials', () => {
    cy.visit('/login');

    // Fill form
    cy.get('[data-cy="email"]').type('user@example.com');
    cy.get('[data-cy="password"]').type('password123');
    cy.get('[data-cy="submit"]').click();

    // Verify success
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="welcome-message"]').should('contain', 'Welcome back!');
  });

  it('Shows error for invalid credentials', () => {
    cy.visit('/login');

    cy.get('[data-cy="email"]').type('invalid@example.com');
    cy.get('[data-cy="password"]').type('wrongpassword');
    cy.get('[data-cy="submit"]').click();

    cy.get('[data-cy="error-message"]').should('contain', 'Invalid credentials');
  });
}) */
})
