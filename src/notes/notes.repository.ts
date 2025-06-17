import { Inject, Injectable } from "@nestjs/common";
import { CreateNoteDto } from "./dto/create-note.dto";
import * as schema from "./schema";
import { DATABASE_CONNECTION } from "../drizzle/constants";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

export const NOTES_REPOSITORY = 'NotesRepository';

@Injectable()
export class NotesRepository {
    constructor(@Inject(DATABASE_CONNECTION) private readonly db: NodePgDatabase<typeof schema>) {}

    async createNote(createNoteDto: CreateNoteDto) {
        const [note] = await this.db
            .insert(schema.notes)
            .values(createNoteDto)
            .returning();

        return note;
    }
}