/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("collections", (tbl) => {
      //auto id
      tbl.increments();
      //collection name
      tbl.text("name").notNullable;
      //created, modified
      tbl.timestamps(true, true);
    })
    .createTable("information", (tbl) => {
      tbl.increments();
      tbl.string("contributer").index();
      tbl.text("text");
      tbl.timestamps(true, true);

      //foreign key to collections table
      tbl
        .integer("collection_id")
        //disallow negative numbers
        .unsigned()
        //refers to auto id in collections
        .references("id")
        .inTable("collections")
        //
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  //undoing changes
  return knex.schema
    .dropTableIfExists("information")
    .dropTableIfExists("collections");
};
