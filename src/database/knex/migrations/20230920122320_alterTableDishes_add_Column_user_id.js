exports.up = knex =>
  knex.schema.alterTable("dishes", table => {
    table.integer("user_id").references("id").inTable("users");
  });

exports.down = knex =>
    knex.schema.table("dishes", table => {
        table.dropColumn("user_id");
});
