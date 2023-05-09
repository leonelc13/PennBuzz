describe('Profile Flow', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3001/login')
      cy.get('#username').type('johndoe');
      cy.get('#password').type('test');
      cy.get('.login-button').click();
    });
  
    it('Main feed page renders correctly', () => {
      cy.url().should('include', '/');
      cy.get('.main-feed-container').should('exist');
    });

    it('Redirects to create quiz page on create quiz button click', () => {
      cy.get('.create-quiz-container').should('exist');
      cy.get('.create-quiz-button').click();
      cy.url().should('include', '/create_quiz');
    });
    
  })