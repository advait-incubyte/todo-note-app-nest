import { Inject, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';

interface NotesRepository {
    createNote: (createNoteDto: CreateNoteDto) => Promise<CreateNoteDto>;
}

@Injectable()
export class NotesService {
    constructor(@Inject('NotesRepository') private readonly notesRepository: NotesRepository) {
        console.log('Injected notesRepository:', this.notesRepository);
    }

    async createNote(data: CreateNoteDto): Promise<CreateNoteDto> {
        return this.notesRepository.createNote(data);
    }
}
