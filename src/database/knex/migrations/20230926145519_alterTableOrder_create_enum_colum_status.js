exports.up = knex =>
  knex.schema.alterTable("orders", table => {
    table.enum("status", ["pendente", "preparando", "entregue"], {
      useNative: true,
      enumName: "status"
    }).notNullable().defaultTo("pendente");
  });

exports.down = knex =>
  knex.schema.alterTable("orders", table => {
    table.dropColumn("status");
    knex.raw('DROP TYPE IF EXISTS status');
  });