import { Controller, HttpCode, HttpStatus, Inject, Body, Param, Post, Get } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    constructor(@Inject(NotesService) private readonly notesService: NotesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createNote(@Body() createNoteDto: CreateNoteDto) {
        return this.notesService.createNote(createNoteDto);
    }

    @Get(':id')
    getNote(@Param('id') id: string) {
        return { id, title: 'Test Note', content: 'This is a test note' }
    }
}
