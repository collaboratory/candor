
exports.up = async knex => {
  await knex.schema.createTable("domains", table => {
    table.increments("id");
    table.string("domain").unique();
    table.text("description");
    table.integer("parent_domain_id").unsigned().nullable().default(null);
    table.foreign("parent_domain_id").references("id").on("domains");
    table.timestamps();
  });

  await knex.schema.createTable("project_domains", table => {
    table.integer("project_id").unsigned();
    table.integer("domain_id").unsigned();
    table.unique("project_id", "domain_id");
    table.foreign("project_id").references("id").on("projects").onDelete("cascade");
    table.foreign("domain_id").references("id").on("domains").onDelete("cascade");
    table.timestamps();
  });
};

exports.down = async knex => {
  await knex.schema.dropTable("project_domains");
  await knex.schema.dropTable("domains");
};
