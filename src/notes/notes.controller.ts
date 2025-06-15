import { Post, Controller, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createNote(@Body() createNoteDto: CreateNoteDto) {
        return this.notesService.createNote(createNoteDto);
    }
}
