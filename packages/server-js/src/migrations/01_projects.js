exports.up = async knex => {
  await knex.schema.createTable("projects", table => {
    table.increments("id");
    table.string("title");
    table.text("description");
    table.timestamps();
  })
};

exports.down = async knex => {
  await knex.schema.dropTable("projects");
};
