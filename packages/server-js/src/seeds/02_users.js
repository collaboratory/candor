const crypto = require('crypto');

exports.seed = async knex => {
  const hash = crypto.createHash('sha256');
  hash.update('password');
  await knex("users").insert({
    id: 1,
    email: "drew@collaboratory.io",
    password_digest: hash.digest('base64')
  });
};