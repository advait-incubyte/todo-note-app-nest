import { Inject, Injectable } from "@nestjs/common";
import { CreateNoteDto } from "./dto/create-note.dto";
import * as schema from "./schema";
import { DATABASE_CONNECTION } from "../drizzle/constants";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { UpdateNoteDto } from "./dto/update-note.dto";

export const NOTES_REPOSITORY = 'NotesRepository';

const { notes } = schema;

@Injectable()
export class NotesRepository {
    constructor(@Inject(DATABASE_CONNECTION) private readonly db: NodePgDatabase<typeof schema>) {}

    async createNote(createNoteDto: CreateNoteDto) {
        const [note] = await this.db
            .insert(notes)
            .values(createNoteDto)
            .returning();

        return note;
    }

    async getNotes() {
        return this.db
            .select()
            .from(notes);
    }

    async getNote(id: number) {
        const [note] = await this.db
            .select()
            .from(notes)
            .where(eq(notes.id, id));

        return note;
    }

    async deleteNote(id: number) {
        await this.db
            .delete(notes)
            .where(eq(notes.id, id));
    }

    async updateNote(id: number, data: UpdateNoteDto) {
        const [note] = await this.db
            .update(notes)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(notes.id, id))
            .returning();

        return note;
    }
}