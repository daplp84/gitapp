describe('Ingresos Test', () => {
    // Limpio la db antes de cada test
    beforeEach(() => {
        cy.task('seed');
    });

    it('Deberia cargar el formulario al editar un ingreso', () => {
        cy.visit('/income');

        cy.get('[data-testid=movement]')
            .find('button')
            .contains('editar')
            .click();

        cy.get('input[name=id]').should('have.value', '14');
        cy.get('input[name=category]').should('have.value', 'Plazo Fijo');
        cy.get('input[name=amount]').should('have.value', '11000');
    });

    it('Deberia poder crear un nuevo ingreso', () => {
        cy.visit('/income');

        cy.get('input[name=date]').type('2021-04-26');
        cy.get('input[name=category]').type('Bono');
        cy.get('input[name=amount]').type('100000');
        cy.contains('Guardar').click();

        cy.get('[data-testid=movement]').should('have.length', 5);
    });

    it('Deberia aparecer la alerta luego de crear un ingreso', () => {
        cy.visit('/income');

        cy.get('input[name=date]').type('2021-05-28');
        cy.get('input[name=category]').type('Prueba ingreso');
        cy.get('input[name=amount]').type('150000');
        cy.contains('Guardar').click();

        cy.get('[data-testid=save-alert]').should('be.visible');
    });

    it('Los últimos ingresos deberían estar ordenados por fecha descendente', () => {
        cy.visit('/income');
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
