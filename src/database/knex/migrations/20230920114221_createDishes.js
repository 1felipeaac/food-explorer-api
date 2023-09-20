
exports.up = knex =>
knex.schema.createTable("dishes", table => {
    table.increments("id");
    table.text("image")
    table.text("name").notNullable();
    table.text("category").notNullable();
    table.text("description").notNullable();

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("dishes");
