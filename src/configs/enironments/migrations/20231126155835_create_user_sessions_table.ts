import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("user_sessions", (table) => {
    table.string("sid").primary().notNullable();
    table.json("session").notNullable();
    table.timestamp("expired").notNullable();
    table.boolean("is_ex[ired").defaultTo(false).notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updatedAt").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("user_sessions");
}
