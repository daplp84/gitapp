import { getRefs, render } from './render.js';
import movementService from './movement-service.js';

let state = {
    movements: [],
    movement: {},
    hasEdit: true,
    renderType: '',
    message: '',
    type: ''
};

const typeEnum = {
    INCOME: {value: 0, name: "income"}, 
    EXPENSE: {value: 1, name: "expense"}
};

const msgTypeEnum = {
    NOMESSAGE: {value: 0, name: "NoMessage"},
    SUCCESSMESAGGE: {value: 1, name: "SuccessMessage"},
    ERRORMESSAGE: {value: 2, name: "ErrorMessage"}
}

let refs = getRefs(document.body);

/**
 * Obtiene todos los ultimos movimientos disponibles
 **/
async function getMovements() {
    return movementService.getMovementsByType(state.type);
}

/**
 * Renderiza los movimientos
 **/
function renderMovements() {
    render('movement-list.html', state, state.renderType);
}

function refreshMovements(mov){
    const index = state.movements.findIndex(element => element.id == mov.id);
    if(index > -1){
        state.movements[index] = mov;
    }else{
        state.movements.push(mov);
    }
    renderMovements();
}

/**
 * Inicializa la vista
 **/
async function init() {
    if(refs.incomes != null){
        state.renderType = refs.incomes;
        state.type = typeEnum.INCOME.name;
    }else{
        state.renderType = refs.expenses;
        state.type = typeEnum.EXPENSE.name;
    }
    state.movements = await getMovements();
    renderMovements();
}

function getMovementData() {
    const formData = new FormData(refs.form.firstElementChild);
    const movement = Object.fromEntries(formData);
    movement.type = state.type;
    return movement;
}

// Event Listeners

/**
 * Agrega un movimiento a edicion
 **/
window.editMovement = function (movement) {
    state.message = msgTypeEnum.NOMESSAGE;
    state.movement = movement;
    render('movement-form.html', state, refs.form);
};

/**
 * Cancela una edicion o creación
 **/
window.onCancel = function () {
    state.movement = {};
    render('movement-form.html', state, refs.form);
};

/**
 * Elimina un movimiento
 **/
window.onRemove = async function () {
    await movementService.update(state.movement);
    state.movement = {};
    render('movement-form.html', state, refs.form);
};

/**
 * Guarda un movimiento
 **/
window.onSave = async function (e) {
    e.stopPropagation();
    e.preventDefault();
    const movement = getMovementData();
    let res = {};
    if (movement.id) {
        res = await movementService.update(movement);
    } else {
        res = await movementService.create(movement);
    }
    if(res.id > 0){
        refreshMovements(res);
        state.message = msgTypeEnum.SUCCESSMESAGGE;
        state.movement = {};
    }else{
        state.message = msgTypeEnum.ERRORMESSAGE;
    }
    render('movement-form.html', state, refs.form);
};

init();
