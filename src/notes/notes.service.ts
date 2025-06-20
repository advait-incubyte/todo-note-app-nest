import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesRepository } from './notes.repository';
import { notes as noteSchema } from './schema';
import { UpdateNoteDto } from './dto/update-note.dto';

type Note = typeof noteSchema.$inferSelect;

@Injectable()
export class NotesService {
    constructor(@Inject(NotesRepository) private readonly notesRepository: NotesRepository) {}

    async createNote(data: CreateNoteDto): Promise<Note> {
        return this.notesRepository.createNote(data);
    }

    async getNotes(): Promise<Note[]> {
        return this.notesRepository.getNotes();
    }

    async getNote(id: number): Promise<Note> {
        const note = await this.notesRepository.getNote(id);

        if (!note) {
            throw new NotFoundException(`Note with id ${id} not found`);
        }

        return note;
    }

    async updateNote(id: number, data: UpdateNoteDto): Promise<Note> {
        return this.notesRepository.updateNote(id, data);
    }

    async deleteNote(id: number): Promise<void> {
        return this.notesRepository.deleteNote(id);
    }
}
