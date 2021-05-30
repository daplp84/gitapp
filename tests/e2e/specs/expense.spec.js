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

    it('Deberia aparecer y funcionar correctamente la tabla de egresos', () => {
        cy.visit('/expense');
        cy.title().should('eq', 'Gitapp - Egresos');
        cy.get('[data-testid=last-movements]').contains('Últimos egresos');
        cy.get('[data-testid=movement]').should('have.length', 5);
        cy.get('[data-testid=movement]').each( (item) => {
            cy.wrap(item)
            .get('[data-testid=movement-icon]')
            .should('have.attr', 'src')
            .should('contain', 'expense');
        });
    });
});
