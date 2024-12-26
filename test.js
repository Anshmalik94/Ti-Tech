// cypress/integration/login.spec.js

describe('Login Automation Test', () => {
    beforeEach(() => {
        // Visit the login page
        cy.visit('http://localhost:3000/login');  // Update this URL if needed
    });

    it('should successfully login with valid credentials', () => {
        // Enter username and password
        cy.get('input[name="username"]').type('validUsername'); // Replace with valid username
        cy.get('input[name="password"]').type('validPassword'); // Replace with valid password

        // Submit the form
        cy.get('.form4-submit').click();

        // Check if navigated to home page
        cy.url().should('include', '/home');
        cy.get('h1').contains('Welcome'); // Assuming home page has a welcome message
    });

    it('should show error message on invalid login', () => {
        // Enter invalid username and password
        cy.get('input[name="username"]').type('invalidUsername');
        cy.get('input[name="password"]').type('invalidPassword');

        // Submit the form
        cy.get('.form4-submit').click();

        // Verify error message is displayed
        cy.get('.error').should('be.visible').and('contain', 'Invalid username or password.');
    });

    it('should navigate to the registration form when "Register here" is clicked', () => {
        // Click on the register link
        cy.get('.register-link').click();

        // Verify the URL contains /registrationform
        cy.url().should('include', '/registrationform');
    });
});
