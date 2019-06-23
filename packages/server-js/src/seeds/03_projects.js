
exports.seed = async knex => {
  await Promise.all([
    knex("project_group_permissions").del(),
    knex("project_group_users").del(),
    knex("project_groups").del(),
    knex("project_domains").del(),
    knex("domains").del(),
    knex("projects").del()
  ]);

  await knex("projects").insert({
    id: 1,
    title: "Demo",
    description: "Initial demo project"
  });

  await knex("domains").insert([
    {
      id: 1,
      domain: "localhost",
      description: "Localhost development domain"
    }
  ]);

  await knex("project_domains").insert([
    {
      project_id: 1,
      domain_id: 1
    }
  ]);

  await knex("project_groups").insert([
    {
      id: 1,
      project_id: 1,
      title: "Administrators",
      description: "Administrative users"
    }
  ]);

  await knex("project_group_permissions").insert([
    {
      project_group_id: 1,
      permission_id: 1
    }
  ]);

  await knex("project_group_users").insert([
    {
      project_group_id: 1,
      user_id: 1
    }
  ]);
};
