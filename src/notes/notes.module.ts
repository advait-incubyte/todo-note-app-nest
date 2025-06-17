import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';

const MockNotesRepository = {
  provide: 'NotesRepository',
  useValue: {
    createNote: (createNoteDto: CreateNoteDto) => Promise<CreateNoteDto>
  }
}

@Module({
  controllers: [NotesController],
  providers: [
    NotesService,
    MockNotesRepository
  ]
})
export class NotesModule {}
