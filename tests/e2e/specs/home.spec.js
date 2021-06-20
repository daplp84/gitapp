describe('Home Test', () => {
    // Limpio la db antes de cada test
    beforeEach(() => {
        cy.task('seed');
    });

    it('Deberia tener de titulo Gitapp', () => {
        cy.visit('/');
        cy.title().should('eq', 'Gitapp');
    });

    it('Deberia mostrar los ultimos 5 movimientos', () => {
        cy.visit('/');

        cy.get('[data-testid=last-movements]').contains('Últimos movimientos');
        cy.get('[data-testid=movement]').should('have.length', 5);
    });

    it('Deberia poder navegar a income', () => {
        cy.visit('/');

        cy.get('a[href*=income]')
            .contains('Ingresos')
            .click()
            .title()
            .should('eq', 'Gitapp - Ingresos')
    });

    it('Los últimos movimientos deberían estar ordenados por fecha descendente', () => {
        cy.visit('/');
        var lastDate = "";
        cy.get('[data-testid=movement-date]').each((item, index) => {
            cy.wrap(item).invoke('text').then((text) => 
            {
                var dateParts = text.split('/');
                var actDate = new Date(parseInt(dateParts[2].slice(0,4)), parseInt(dateParts[1]), parseInt(dateParts[0]));
                if(index > 0)
                    cy.wrap(actDate).should('be.lte', lastDate);
                
                lastDate = actDate;
            });
           
        });
    });
});
