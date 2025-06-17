import { Module } from '@nestjs/common';

import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesRepository } from './notes.repository';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [NotesController],
  providers: [NotesService, NotesRepository]
})
export class NotesModule {}
