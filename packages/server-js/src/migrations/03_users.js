
exports.up = async knex => {
  await knex.schema.createTable("users", table => {
    table.increments("id");
    table.string("email").unique();
    table.string("password_digest");
    table.timestamp("active_at");
    table.timestamps();
  });
};

exports.down = async knex => {
  await knex.schema.dropTable("users");
};
