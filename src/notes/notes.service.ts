import { Inject, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesRepository } from './notes.repository';
import { notes as noteSchema } from './schema';

type Note = typeof noteSchema.$inferSelect;

@Injectable()
export class NotesService {
    constructor(@Inject(NotesRepository) private readonly notesRepository: NotesRepository) {}

    async createNote(data: CreateNoteDto): Promise<Note> {
        return this.notesRepository.createNote(data);
    }

    async getNote(id: number): Promise<Note> {
        return this.notesRepository.getNote(id);
    }
}
