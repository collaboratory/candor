
exports.up = async knex => {
  await knex.schema.createTable("permission_groups", table => {
    table.increments("id");
    table.string("title").unique();
    table.string("slug").unique();
    table.text("description");
    table.timestamps();
  })

  await knex.schema.createTable("permissions", table => {
    table.increments("id");
    table.integer("permission_group_id").unsigned();
    table.foreign("permission_group_id").references("id").on("permission_groups");
    table.string("title").unique();
    table.string("slug").unique();
    table.text("description");
    table.timestamps();
  });
};

exports.down = async knex => {
  await knex.schema.dropTable("permissions");
  await knex.schema.dropTable("permission_groups");
};
