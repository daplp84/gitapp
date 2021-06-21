const Sequelize = require('sequelize');

const db = require('../db.js');

const MovementType = require('./movementType.js');

/**
 * Modelo de movimiento.
 *
 *
 */
const Movement = db.define(
    'Movement', {
        // Atributos
        date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        amount: {
            type: Sequelize.NUMBER,
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
            values: MovementType.types,
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        recurrente: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },

    }, { tableName: 'Movement' }
);

/**
 * Obtener todos los movimientos de la base de datos.
 *
 */
const getAllMovements = (limit, skip, type, sort) => {
    let where = {};

    if (type) {
        where = {
            ...where,
            type: type,
        };
    }

    let sortClause = [['id']];
    if(sort){
        if(sort.includes(":"))
            sortClause = [[sort.slice(0, sort.indexOf(":")) , sort.slice(sort.indexOf(":") + 1).toUpperCase()]];
        else
            sortClause = [[sort]];
        
    }

    return Movement.findAndCountAll({
        order: sortClause, 
        limit: limit,
        offset: skip,
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
        where: where,
    });
};

/**
 * Crear un movimiento nuevo.
 * Parámetro data: JSON con los atributos a crear.
 *
 */
const createMovement = ({
    date = '01/01/2021',
    amount = 0.0,
    type = MovementType.EXPENSE,
    category = '',
    description = '',
    recurrente = false,
} = {}) => {
    //date = new Date()
    return (amount < 0) ? null : Movement.create({ date, amount, type, category, description, recurrente });
};

/**
 * Modifica un movimiento ya existente.
 * Parámetro id: id a buscar en la base de datos.
 * Parámetro data: JSON con los atributos a crear.
 *
 */
const updateMovement = (
    id, {
        date = '01/01/2021',
        amount = 0.0,
        type = MovementType.EXPENSE,
        category = '',
        description = '',
        recurrente = false,
    } = {}
) => {
    return Movement.findOne({ where: { id: id } }).then((movement) => {
        if (movement != null) {
            return (amount < 0) ? null : movement.update({ date, amount, type, category, description, recurrente });
        }
        return null;
    });
};

/**
 * Elimina un movimiento existente.
 * Parámetro id: id a buscar en la base de datos.
 *
 */
const deleteMovement = (id) => {
    return Movement.findOne({ where: { id: id } }).then((movement) => {
        if (movement != null) {
            return movement.destroy();
        }
        return null;
    });
};

const MovementModel = {
    Movement: Movement,
    getAll: getAllMovements,
    create: createMovement,
    update: updateMovement,
    delete: deleteMovement,
};

module.exports = MovementModel;