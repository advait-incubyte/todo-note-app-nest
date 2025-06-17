import { Module, ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { NotesModule } from './notes/notes.module';
import { DrizzleModule } from './drizzle/drizzle.module';

const metadata: ModuleMetadata = {
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    NotesModule
  ],
}
@Module(metadata)
export class AppModule {}
