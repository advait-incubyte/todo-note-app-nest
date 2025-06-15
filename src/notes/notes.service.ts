import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';

interface NotesRepository {
    createNote: (createNoteDto: CreateNoteDto) => Promise<CreateNoteDto>;
}

@Injectable()
export class NotesService {
    constructor(private readonly notesRepository: NotesRepository) {}

    async createNote(data: CreateNoteDto): Promise<CreateNoteDto> {
        return this.notesRepository.createNote(data);
    }
}
