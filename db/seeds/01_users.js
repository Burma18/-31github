/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    { id: 1, name: "Burma", email: "test1@gmail.com" },
    { id: 2, name: "Bekulan", email: "test2@gmail.com" },
    { id: 3, name: "Tajira", email: "test3@gmail.com" },
  ]);
};
