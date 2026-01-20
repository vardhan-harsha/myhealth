import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const runMigrations = async () => {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error('DATABASE_URL environment variable is not set');
    }

    console.log('🔄 Starting database migrations...');

    // Create connection for migrations (single connection)
    const migrationClient = postgres(connectionString, { max: 1 });
    const db = drizzle(migrationClient);

    try {
        await migrate(db, { migrationsFolder: './migrations' });
        console.log('✅ Migrations completed successfully');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        throw error;
    } finally {
        await migrationClient.end();
    }
};

runMigrations().catch((err) => {
    console.error('Fatal migration error:', err);
    process.exit(1);
});
