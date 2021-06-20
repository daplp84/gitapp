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

    it('Deberia aparecer la alerta luego de crear un egreso', () => {
        cy.visit('/expense');

        cy.get('input[name=date]').type('2021-05-29');
        cy.get('input[name=category]').type('Prueba');
        cy.get('input[name=amount]').type('3500');
        cy.contains('Guardar').click();

        cy.get('[data-testid=save-alert]').should('be.visible');

    });


    it('Deberia aparecer y funcionar correctamente la tabla de egresos', () => {
        cy.visit('/expense');
        cy.title().should('eq', 'Gitapp - Egresos');
        cy.get('[data-testid=last-movements]').contains('Últimos egresos');
        cy.get('[data-testid=movement]').should('have.length', 5);
        cy.get('[data-testid=movement]').each((item) => {
            cy.wrap(item)
                .get('[data-testid=movement-icon]')
                .should('have.attr', 'src')
                .should('contain', 'expense');
        });
    });

});