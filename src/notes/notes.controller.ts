import { Post, Controller, HttpCode, HttpStatus, Body, Inject } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    constructor(@Inject('NotesService') private readonly notesService: NotesService) {
        console.log('NotesController created. Injected notesService:', this.notesService);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createNote(@Body() createNoteDto: CreateNoteDto) {
        return this.notesService.createNote(createNoteDto);
    }
}
