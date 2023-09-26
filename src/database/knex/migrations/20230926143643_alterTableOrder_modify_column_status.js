exports.up = knex =>
  knex.schema.alterTable("orders", table => {
    table.dropColumn("status")
  }).then(() => {
    knex.schema.alterTable("orders", table => {
      table.enum("status", ["pendente", "preparando", "entregue"], {
        useNative: true,
        enumName: "status"
      }).notNullable().defaultTo("pendente");
    });
  })

exports.down = knex =>
  knex.schema.alterTable("orders", table => {
    table.dropColumn("status");
  }).then(() => {
    return knex.schema.alterTable("orders", table => {
      table.text("status").notNullable().defaultTo("em preparo");
    });
  });