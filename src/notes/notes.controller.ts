import { Controller, HttpCode, HttpStatus, Inject, Body, Param, Post, Get, Delete } from '@nestjs/common';
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
    getNote(@Param('id') id: number) {
        return this.notesService.getNote(id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteNote(@Param('id') id: number) {
        return this.notesService.deleteNote(id);
    }
}
