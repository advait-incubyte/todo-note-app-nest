import { Config, defineConfig } from 'drizzle-kit';

const config: Config = {
    schema: './src/**/schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.TEST_DATABASE_URL!,
    }
}
export default defineConfig(config);