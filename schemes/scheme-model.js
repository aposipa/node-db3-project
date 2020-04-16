const db = require("../data/db-config.js");

module.exports = {
    find, 
    findById,
    findSteps,
    add,
    update,
    remove
};

function find() {
    return db('schemes');
}

function findById(id) {
    return db("schemes")
    .where({ id })
    .first();
}

function findSteps (id) {
    return db("steps")
    .select('schemes.scheme_name', 'steps.step_number', 'steps.instructions')
    .join('schemes', 'schemes.id', '=', 'steps.scheme_id')
    .where({ 'scheme_id': id })
};

function add(scheme) { 
    return db('schemes')
    .insert(scheme, "id")
    .then(([id]) => {
        return findById(id);
    });
}

function update(changes, id) {
    return db('schemes')
    .where({ id })
    .update(changes);
}

function remove(id) {
    const deleted = findById(id)
    db('schemes')
    .where('id', id)
    .del();
    return deleted;
}