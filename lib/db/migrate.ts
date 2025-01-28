/**
 * Database Migration Script
 * This script handles the execution of database migrations using Drizzle ORM.
 * It ensures the database schema is up to date with the latest changes.
 */

import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

// Load environment variables from .env.local file
config({
  path: '.env.local',
});

/**
 * Executes database migrations
 * This function:
 * 1. Validates the database connection URL
 * 2. Establishes a connection to the database
 * 3. Runs all pending migrations from the migrations folder
 * 4. Logs the migration duration and status
 */
const runMigrate = async () => {
  // Ensure database URL is configured
  if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL is not defined');
  }

  // Create database connection with single connection limit for migrations
  const connection = postgres(process.env.POSTGRES_URL, { max: 1 });
  const db = drizzle(connection);

  console.log('⏳ Running migrations...');

  const start = Date.now();
  
  try {
    // Execute migrations from the specified folder
    await migrate(db, { migrationsFolder: './lib/db/migrations' });
    
    const end = Date.now();
    console.log('✅ Migrations completed in', end - start, 'ms');
    
    // Exit successfully
    process.exit(0);
  } catch (error) {
    // Log error details and exit with failure
    console.error('❌ Migration failed');
    console.error(error);
    process.exit(1);
  }
};

// Run migrations
runMigrate().catch((err) => {
  console.error('❌ Migration failed');
  console.error(err);
  process.exit(1);
});
