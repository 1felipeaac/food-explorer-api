exports.up = knex =>
  knex.schema.alterTable("ingredients", table => {
    table.renameColumn('name', 'ingredient');
  });

exports.down = knex =>
    knex.schema.table("ingredients", table => {
        table.renameColumn('ingredient', 'name');
});
