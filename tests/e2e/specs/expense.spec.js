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

    it('Deberia poder crear un nuevo egreso con descripcion', () => {
        cy.visit('/expense');

        cy.get('input[name=description]').type('Cuadernos');
        cy.get('input[name=date]').type('2021-05-30');
        cy.get('input[name=category]').type('Libreria');
        cy.get('input[name=amount]').type('300');
        cy.contains('Guardar').click();

        cy.get('[data-testid=movement]').should('have.length', 6);
    });


    it('Deberia visualizar el campo descripcion al editar un egreso', () => {
        cy.visit('/expense');

        cy.get('[data-testid=movement]')
            .find('button')
            .contains('editar')
            .click();

        cy.get('input[name=description]');
    });

});
