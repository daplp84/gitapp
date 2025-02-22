const BASE_URL = '/api/v1';

async function getLast() {
    const resp = await fetch(`${BASE_URL}/movements?sort=date:DESC`);
    const { movements } = await resp.json();
    return movements;
}

async function getMovementsByType(type) {
    const resp = await fetch(`${BASE_URL}/movements?type=` + type + `&sort=date:DESC`);
    const { movements } = await resp.json();
    return movements;
}

async function update(movement) {
    const resp = await fetch(`${BASE_URL}/movements/${movement.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movement),
    });

    return  (resp.status == 500) ? "Error al crear el movimiento." : await resp.json();
}

async function create(movement) {
    const resp = await fetch(`${BASE_URL}/movements`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movement),
    });

    return  (resp.status == 500) ? "Error al crear el movimiento." : await resp.json();
}

async function remove(movement) {


    console.log('delete:', movement);

    const resp = await fetch(`${BASE_URL}/movements/${movement.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movement),
      
    });

    return resp.ok ? movement : {};

}

export default {
    create,
    update,
    remove,
    getLast,
    getMovementsByType,
};
