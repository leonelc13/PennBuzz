describe('Login Flow', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3001/login')
  });

  it('Should display login page', () => {
    cy.get('.login-container').should('exist');
  });

  it('Login page renders correctly', () => {
    cy.get('.login-button').contains('Sign In');
    cy.get('.sign-text').contains('Sign In');
    cy.get('#username').should('have.value', '');
    cy.get('#password').should('have.value', '');
    cy.get('.heading-text').contains('PennBuzz');
    cy.get('#Usernametitle').contains("Username");
    cy.get('#Passwordtitle').contains("Password");
  });

  it('Testing incorrect inputs', () => {
    cy.get('#username').type('testuser');
    cy.get('#password').type('incorrectpassword');
    cy.get('.login-button').click()
    cy.get('.error-message').should('contain', 'User does not exist')
  })

  it('Testing missing username', () => {
    cy.get('#password').type('incorrectpassword');
    cy.get('.login-button').click()
    cy.get('.error-message').should('contain', 'Missing username')
  })

  it('Testing missing password', () => {
    cy.get('#username').type('testuser');
    cy.get('.login-button').click()
    cy.get('.error-message').should('contain', 'Missing password')
  })

  it('Testing missing password', () => {
    cy.get('.login-button').click()
    cy.get('.error-message').should('contain', 'Missing username and password')
  })

  it('Testing incorrect password', () => {
    cy.get('#username').type('johndoe');
    cy.get('#password').type('incorrectpassword');
    cy.get('.login-button').click()
    cy.get('.error-message').should('contain', 'Password does not match our records')
  })

  it('Testing clicking sign up', () => {
    cy.get('.sign-up-text').click()
    cy.url().should('include', '/register')
  })

  it('Should log in with correct credentials, redirect to the main feed, and log user back out to login', () => {
    cy.get('#username').type('johndoe');
    cy.get('#password').type('test');
    cy.get('.login-button').click();

    cy.url().should('include', '/');
    cy.get('.main-feed-container').should('exist');

    cy.get('.logout_button').click()
    cy.url().should('include', '/login')
  });

})