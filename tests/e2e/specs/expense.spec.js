describe('Egresos Test', () => {
    // Limpio la db antes de cada test
    beforeEach(() => {
        cy.task('seed');
    });

    it('Deberia poder crear un nuevo egreso', () => {
        cy.visit('/expense');

        cy.get('input[name=date]').type('2021-04-26');
        cy.get('input[name=category]').type('Bono');
        cy.get('input[name=amount]').type('100000');
        cy.contains('Guardar').click();

        cy.get('[data-testid=movement]').should('have.length', 6);
    });

    it('Deberia aparecer la alerta luego de crear un egreso', () => {
        cy.visit('/expense');

        cy.get('input[name=date]').type('2021-05-29');
        cy.get('input[name=category]').type('Prueba');
        cy.get('input[name=amount]').type('3500');
        cy.contains('Guardar').click();

        cy.get('[data-testid=save-alert]').should('be.visible');
    });



});
