import { Controller, HttpCode, HttpStatus, Inject, Body, Param, Post, Get, Delete, Put } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesService } from './notes.service';
import { UpdateNoteDto } from './dto/update-note.dto';

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

    @Get()
    getNotes() {
        return this.notesService.getNotes();
    }

    @Put(':id')
    updateNote(@Param('id') id: number, @Body() updateNoteDto: UpdateNoteDto) {
        return this.notesService.updateNote(id, updateNoteDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteNote(@Param('id') id: number) {
        return this.notesService.deleteNote(id);
    }
}
