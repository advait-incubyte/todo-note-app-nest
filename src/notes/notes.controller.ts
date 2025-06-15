import { Post, Controller, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createNote(@Body() createNoteDto: CreateNoteDto) {
        return 'created';
    }
}
