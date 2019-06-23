exports.seed = async knex => {
  await Promise.all([
    knex("permissions").del(),
    knex("permission_groups").del()
  ]);

  await knex("permission_groups").insert([
    {
      id: 1,
      title: "Project Management",
      slug: "project",
      description: "Project-related permissions"
    },
    {
      id: 2,
      title: "Domain Management",
      slug: "domain",
      description: "Domain-related permissions"
    },
    {
      id: 3,
      title: "Session Management",
      slug: "session",
      description: "Session-related permissions"
    },
    {
      id: 4,
      title: "User Management",
      slug: "user",
      description: "User-related permissions"
    },
    {
      id: 5,
      title: "Permission Management",
      slug: "permission",
      description: "Permissions to manage permissions"
    },
    {
      id: 6,
      title: "Configuration Management",
      slug: "config",
      description: "Manage configuration options"
    }
  ]);

  // Project management permissions
  await knex("permissions").insert([
    {
      id: 1,
      title: "Administrator",
      slug: "project.administrator",
      permission_group_id: 1
    },
    {
      id: 2,
      title: "Manage Project",
      slug: "project.manage",
      permission_group_id: 1
    },
    {
      id: 3,
      title: "View Project",
      slug: "project.view",
      permission_group_id: 1
    },
    {
      id: 4,
      title: "Invite to Project",
      slug: "project.invite",
      permission_group_id: 1
    },
    {
      id: 5,
      title: "Manage Project Groups",
      slug: "project.groups.manage",
      permission_group_id: 1
    },
    {
      id: 6,
      title: "View Project Groups",
      slug: "project.groups.view",
      permission_group_id: 1
    }
  ])
};