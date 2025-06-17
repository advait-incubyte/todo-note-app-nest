import { Config, defineConfig } from 'drizzle-kit';

const config: Config = {
    schema: './src/**/schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    }
}
export default defineConfig(config);