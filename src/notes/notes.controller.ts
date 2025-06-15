import { Post, Controller, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createNote() {
        return 'created';
    }
}
