exports.up = knex =>
  knex.schema.createTable("orders", table => {
    table.increments("id");
    table.text("status").notNullable().defaultTo("em preparo");
    table.text("detailing").notNullable();

    table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users")

    table.timestamp("created_at").default(knex.fn.now());
  });

exports.down = knex => knex.schema.dropTable("users");