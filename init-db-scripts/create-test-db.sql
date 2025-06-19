-- init-db-scripts/create-test-db.sql
-- Create the test database
CREATE DATABASE "nest-drizzle-test";

-- Grant all privileges on the new test database to your Nest user
GRANT ALL PRIVILEGES ON DATABASE "nest-drizzle-test" TO nestuser;