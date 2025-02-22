const MovementModel = require('../../server/models/movement.js');
const MovementType = require('../../server/models/movementType.js');

beforeEach(async() => {
    await MovementModel.Movement.sync({ force: true });
});


test('Verifica que existe el campo booleano en el modelo para saber si el movimiento es recurrente', async() => {

    const MovementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
        recurrente: true,
    };

    const movement = await MovementModel.create(MovementData);

    expect(movement.recurrente).toBe(MovementData.recurrente);
});


//--- Testear que se tome la fecha enviada en la creación de un movimiento.
test('Verifica fecha al crear movimiento', async() => {
    const movementData = {

        date: new Date(2021, 5, 15),
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    // Se crea el movimiento
    const movement = await MovementModel.create(movementData);

    expect(movement.date).toBe(movementData.date);

});


test('Crear movimiento', async() => {
    const movementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    // Creamos el movimiento
    const movement = await MovementModel.create(movementData);

    expect(movement.amount).toBe(movementData.amount);
    expect(movement.type).toBe(movementData.type);
    expect(movement.category).toBe(movementData.category);
});

test('Crear movimiento con descripcion', async() => {
    const movementData = {
        description: 'Lapiceras',
        date: '29/05/2021',
        amount: 150.0,
        category: 'Libreria',
    };

    // Crea el movimiento
    const movement = await MovementModel.create(movementData);
    // Se espera obtener que la descripcion creada sea igual a la ingresada.
    expect(movement.description).toBe(movementData.description);
});

test('Crear movimiento sin tipo', async() => {
    const movementData = {
        date: '01/01/2021',
        amount: 1000.0,
        category: 'Supermercado',
    };

    // Creamos el movimiento
    const movement = await MovementModel.create(movementData);

    expect(movement.amount).toBe(movementData.amount);
    expect(movement.type).toBe(MovementType.EXPENSE);
    expect(movement.category).toBe(movementData.category);
});

test('Crear movimiento con monto negativo', async () => {
    const movementData = {
        description: 'Sillas',
        date: '20/06/2021',
        amount: -4000,
        category: 'Mobiliario',
    };

    // Crea el movimiento
    const movement = await MovementModel.create(movementData);
    // Se espera que no se pueda crear el movimiento.
    expect(movement).toBeNull();
});

test('Crear movimiento sin fecha', async() => {
    const movementData = {
        amount: 1000.0,
        category: 'Supermercado',
    };

    try {
        await MovementModel.create(movementData);
    } catch (e) {
        expect(e.name).toBe('SequelizeDatabaseError');
    }
});

test('Listar movimientos sin resultados', async() => {
    const movements = await MovementModel.getAll();

    expect(movements).not.toBeNull();
    expect(movements.rows.length).toBe(0);
});

test('Listar movimientos con resultados', async() => {
    const movementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    // Creamos el movimiento
    await MovementModel.create(movementData);

    const movements = await MovementModel.getAll();

    expect(movements).not.toBeNull();
    expect(movements.rows.length).toBe(1);
});

test('Listar movimientos con limite', async() => {
    const firstMovementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    const secondMovementData = {
        date: '05/01/2021',
        amount: 1000.0,
        category: 'Supermercado',
    };

    // Creamos los movimientos
    const movement = await MovementModel.create(firstMovementData);
    await MovementModel.create(secondMovementData);

    let movements = await MovementModel.getAll(1);

    // La lista de movimientos debería contener solo el primero
    expect(movements.rows.length).toBe(1);
    expect(movements.rows[0].id).toBe(movement.id);
});

test('Listar movimientos con limite y offset', async() => {
    const firstMovementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    const secondMovementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    // Creamos los movimientos
    await MovementModel.create(firstMovementData);
    const movement = await MovementModel.create(secondMovementData);

    let movements = await MovementModel.getAll(1, 1);

    // La lista de movimientos debería contener solo el segundo
    expect(movements.rows.length).toBe(1);
    expect(movements.rows[0].id).toBe(movement.id);
});

test('Listar movimientos ordenando por fecha descendente', async() => {
    const firstMovementData = {
        date: new Date(2021, 1, 3),
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    const secondMovementData = {
        date: new Date(2021, 5, 24),
        amount: 50000.0,
        type: MovementType.EXPENSE,
        category: 'Sueldo',
    };

    // Creamos los movimientos
    await MovementModel.create(firstMovementData);
    await MovementModel.create(secondMovementData);

    let movements = await MovementModel.getAll(null, null, null, 'date:desc');

    // La lista de movimientos debería empezar con los datos de secondMovementData (fecha mayor)
    expect(movements.rows.length).toBe(2);
    expect(movements.rows[0].date).toStrictEqual(secondMovementData.date);
});

test('Filtrar movimientos por tipo income', async() => {
    const firstMovementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    const secondMovementData = {
        date: '05/01/2021',
        amount: 1000.0,
        category: 'Supermercado',
    };

    // Creamos los movimientos
    const movement = await MovementModel.create(firstMovementData);
    await MovementModel.create(secondMovementData);

    let movements = await MovementModel.getAll(null, null, MovementType.INCOME);

    // La lista de movimientos debería contener solo el primero
    expect(movements.rows.length).toBe(1);
    expect(movements.rows[0].id).toBe(movement.id);
});

test('Filtrar movimientos por tipo expense', async() => {
    const firstMovementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    const secondMovementData = {
        date: '05/01/2021',
        amount: 1000.0,
        category: 'Supermercado',
    };

    // Creamos los movimientos
    await MovementModel.create(firstMovementData);
    const movement = await MovementModel.create(secondMovementData);

    let movements = await MovementModel.getAll(
        null,
        null,
        MovementType.EXPENSE
    );

    // La lista de movimientos debería contener solo el segundo
    expect(movements.rows.length).toBe(1);
    expect(movements.rows[0].id).toBe(movement.id);
});

test('Filtrar movimientos por tipo inexistente', async() => {
    const firstMovementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    const secondMovementData = {
        date: '05/01/2021',
        amount: 1000.0,
        category: 'Supermercado',
    };

    // Creamos los movimientos
    await MovementModel.create(firstMovementData);
    await MovementModel.create(secondMovementData);

    let movements = await MovementModel.getAll(null, null, 'fake');

    // La lista de movimientos debería estar vacía
    expect(movements.rows.length).toBe(0);
});

test('Editar movimiento', async() => {
    const movementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    // Creamos el movimiento
    const movement = await MovementModel.create(movementData);

    // La categoría debería ser la creada
    expect(movement.category).toBe(movementData.category);

    const updateData = {
        category: 'Otros',
    };

    // Modificamos categoría del movimiento
    const movementUpdated = await MovementModel.update(movement.id, updateData);

    // La función debería retornar algo
    expect(movementUpdated).not.toBeNull();

    // La categoría debería ser la modificada
    expect(movementUpdated.category).toBe('Otros');
});

test('Editar un movimiento con monto negativo', async () => {
    const movementData = {
        date: '04/06/2021',
        amount: 5000,
        type: MovementType.EXPENSE,
        category: 'Mobiliario',
    };
    // Crea el movimiento
    const movement = await MovementModel.create(movementData);

    const updateData = {
        amount: -90,
    };

    // Modificamos movimiento inexistente
    const movementUpdated = await MovementModel.update(movement.id, updateData);

    // La función debería retornar null
    expect(movementUpdated).toBeNull();
});

test('Editar movimiento inexistente', async() => {
    const movementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    // Creamos el movimiento
    const movement = await MovementModel.create(movementData);

    // La categoría debería ser la creada
    expect(movement.category).toBe(movementData.category);

    const updateData = {
        category: 'Otros',
    };

    // Modificamos movimiento inexistente
    const movementUpdated = await MovementModel.update(2, updateData);

    // La función debería retornar null
    expect(movementUpdated).toBeNull();

    const movements = await MovementModel.getAll();

    // La categoría debería seguir siendo la misma
    expect(movements.rows[0].category).toBe(movementData.category);
});


test('Eliminar movimiento', async() => {
    const movementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    // Creamos el movimiento
    const movement = await MovementModel.create(movementData);

    // Buscamos todos los movimientos
    let movements = await MovementModel.getAll();

    // Debe existir un movimiento en la lista
    expect(movements.rows.length).toBe(1);

    // Eliminamos movimiento
    const deleted = await MovementModel.delete(movement.id);

    // La función debería retornar algo
    expect(deleted).not.toBeNull();

    movements = await MovementModel.getAll();

    // No deben haber movimientos en la lista
    expect(movements.rows.length).toBe(0);
});

test('Eliminar movimiento inexistente', async() => {
    const movementData = {
        date: '04/01/2021',
        amount: 50000.0,
        type: MovementType.INCOME,
        category: 'Sueldo',
    };

    // Creamos un movimiento
    await MovementModel.create(movementData);

    // Buscamos todos los movimientos
    let movements = await MovementModel.getAll();

    // Debe existir un movimiento en la lista
    expect(movements.rows.length).toBe(1);

    // Eliminamos movimiento inexistente
    const deleted = await MovementModel.delete(2);

    // La función debería retornar null
    expect(deleted).toBeNull();

    movements = await MovementModel.getAll();

    // El movimiento debería seguir existiendo en la lista
    expect(movements.rows.length).toBe(1);
});