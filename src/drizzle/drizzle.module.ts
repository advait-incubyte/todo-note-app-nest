import { Module } from '@nestjs/common';
import { DATABASE_CONNECTION } from './constants';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { schema } from './globalSchema';

@Module({
    providers: [{
        provide: DATABASE_CONNECTION,
        useFactory: (configService: ConfigService) => {
            return drizzle(configService.getOrThrow('DATABASE_URL'), { schema })
        },
        inject: [ConfigService]
    }],
    exports: [DATABASE_CONNECTION]
})
export class DrizzleModule {}
