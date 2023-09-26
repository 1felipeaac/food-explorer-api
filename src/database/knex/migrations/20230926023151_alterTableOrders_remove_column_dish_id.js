exports.up = knex =>
  knex.schema.table("orders", table => {
    table.dropColumn("dish_id");
  });

exports.down = knex =>
  knex.schema.table("orders", table => {
    table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE");
  });
