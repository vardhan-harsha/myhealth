import { index, pgTableCreator } from "drizzle-orm/pg-core";

/**
 * Legacy Schemas
 * These can be removed once no longer needed
 */

export const createTable = pgTableCreator((name) => `pg-drizzle_${name}`);

export const posts = createTable(
    "post",
    (d) => ({
        id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
        name: d.varchar({ length: 256 }),
        createdById: d.varchar({ length: 255 }).notNull(),
        createdAt: d
            .timestamp({ withTimezone: true })
            .$defaultFn(() => new Date())
            .notNull(),
        updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
    }),
    (t) => [
        index("created_by_idx").on(t.createdById),
        index("name_idx").on(t.name),
    ],
);
