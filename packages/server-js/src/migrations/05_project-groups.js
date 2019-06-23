exports.up = async knex => {
  await knex.schema.createTable("project_groups", table => {
    table.increments("id");
    table.integer("project_id").unsigned();
    table.foreign("project_id").references("id").on("projects").onDelete("cascade");
    table.string("title");
    table.unique("project_id", "title");
    table.text("description");
    table.timestamps();
  });

  await knex.schema.createTable("project_group_permissions", table => {
    table.increments("id");
    table.integer("project_group_id").unsigned();
    table.foreign("project_group_id").references("id").on("project_groups");
    table.integer("permission_id");
    table.foreign("permission_id").references("id").on("permissions");
    table.timestamps();
  });

  await knex.schema.createTable("project_group_users", table => {
    table.integer("project_group_id").unsigned();
    table.foreign("project_group_id").references("id").on("project_groups");
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("id").on("users");
  });
};

exports.down = async knex => {
  await knex.schema.dropTable("project_group_users");
  await knex.schema.dropTable("project_group_permissions");
  await knex.schema.dropTable("project_groups");
};