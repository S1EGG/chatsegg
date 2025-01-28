/**
 * Drizzle ORM Configuration
 * This file configures the Drizzle ORM settings for the project.
 * It specifies the schema location, migration output directory, and database connection details.
 */

import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Load environment variables from .env.local file
config({
  path: '.env.local',
});

// Export Drizzle configuration
export default defineConfig({
  // Location of the schema definition file
  schema: './lib/db/schema.ts',
  
  // Directory where migration files will be generated
  out: './lib/db/migrations',
  
  // Specify PostgreSQL as the database dialect
  dialect: 'postgresql',
  
  // Database connection configuration
  dbCredentials: {
    // Use PostgreSQL connection URL from environment variables
    // biome-ignore lint: Forbidden non-null assertion.
    url: process.env.POSTGRES_URL!,
  },
});
