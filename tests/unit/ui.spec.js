const render = require('../nunjucks-util.js');

const { getByText, getByTestId } = require('@testing-library/dom');
require('@testing-library/jest-dom');

test('Deberia renderizar correctamente un movimiento del tipo income', () => {
    const $movement = render('components/movement', {
        movement: {
            type: 'income',
            date: '01/01/2021',
            amount: 1000.0,
            category: 'Supermercado',
        },
    });

    getByText($movement, 'Supermercado');
    expect(getByTestId($movement, 'movement-icon')).toHaveAttribute(
        'src',
        expect.stringContaining('income')
    );
    expect(getByText($movement, '$')).toHaveClass('has-text-success');
});

test('Las cards de los gráficos deberían utilizar las clases correspondientes', () => {
    const $home = render('home');
    expect(getByText($home, 'Gastos mensuales')).toHaveClass('card-header-title');
    expect(getByText($home, 'Gastos mensuales').parentElement).toHaveClass('card-header');
    expect(getByText($home, 'Balance mensual')).toHaveClass('card-header-title');
    expect(getByText($home, 'Balance mensual').parentElement).toHaveClass('card-header');
});
