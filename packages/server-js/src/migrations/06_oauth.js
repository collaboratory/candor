exports.up = async knex => {
  await knex.schema.createTable("oauth_providers", table => {
    table.increments("id");
    table.string("slug").unique();
    table.text("description");
    table.timestamps();
  });

  await knex.schema.createTable("oauth_tokens", table => {
    table.increments("id");
    table.integer("oauth_provider_id").unsigned();
    table.foreign("oauth_provider_id").references("id").on("oauth_providers");
    table.integer("user_id").unsigned();
    table.foreign("user_id").references("id").on("users");
    table.text("token");
    table.jsonb("provider_metadata");
    table.timestamp("used_at");
    table.timestamps();
  });
};

exports.down = async knex => {
  await knex.schema.dropTable("oauth_tokens");
  await knex.schema.dropTable("oauth_providers");
};