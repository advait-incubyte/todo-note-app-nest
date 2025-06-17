import { Inject, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesRepository } from './notes.repository';

@Injectable()
export class NotesService {
    constructor(@Inject(NotesRepository) private readonly notesRepository: NotesRepository) {}

    async createNote(data: CreateNoteDto): Promise<CreateNoteDto> {
        return this.notesRepository.createNote(data);
    }
}
