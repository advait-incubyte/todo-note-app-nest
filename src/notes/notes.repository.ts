import { Injectable } from "@nestjs/common";
import { CreateNoteDto } from "./dto/create-note.dto";

export const NOTES_REPOSITORY = 'NotesRepository';

@Injectable()
export class NotesRepository {
    async createNote(createNoteDto: CreateNoteDto) {
        return Promise.resolve(createNoteDto);
    }
}