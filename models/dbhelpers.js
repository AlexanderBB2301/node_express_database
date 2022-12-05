const knex = require("knex");
const config = require("../knexfile");
const dataBase = knex(config.development);

module.exports = {
  add,
  findById,
  find,
  remove,
  update,
};
//add a new collection, find a collection, update collection, remove collection, find by id

//post - add info
async function add(collection) {
  const [id] = await dataBase("collections").insert(collection);
  return id;
}

//find a specific collection
function findById(id) {
  //finds all collections
  return (
    dataBase("collections")
      //refines to only return the first record with a matching id
      .where({ id: id })
      .first()
  );
}

//get - retreive all collections
function find() {
  return dataBase("collections");
}

function remove(id) {
  return dataBase("collections").where({ id: id }).del();
}

function update(id, changes) {
  return dataBase("collections")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}
