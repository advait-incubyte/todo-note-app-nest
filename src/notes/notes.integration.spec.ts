import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

import { AppModule } from "../app.module";
import { DATABASE_CONNECTION } from "../drizzle/constants";
import * as schema from "./schema";
import { CreateNoteDto } from "./dto/create-note.dto";

describe('Notes Integration', () => {
    let app: INestApplication;
    let db: NodePgDatabase<typeof schema>;
    let { notes } = schema;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
        })
        .overrideProvider(DATABASE_CONNECTION)
        .useFactory({
            factory: (configService: ConfigService) => {
                const drizzleClient = drizzle(configService.getOrThrow('TEST_DATABASE_URL'), { schema })
                db = drizzleClient;
                return drizzleClient;
            },
            inject: [ConfigService]
        })
        .compile();

        app = module.createNestApplication();
        await app.init();
    })

    afterAll(async () => {
        await app.close();
    })

    it('should be defined', () => {
        expect(app).toBeDefined();
    })

    test('GET /notes should return all notes', async () => {
        // cleaning up existing notes
        await db.delete(notes);

        // creating notes to fetch later
        const notesToCreate: CreateNoteDto[] = [
            {
                title: '/GET Note 1',
                content: 'This is a test note 1'
            },
            {
                title: '/GET Note 2',
                content: 'This is a test note 2'
            },
            {
                title: '/GET Note 3',
                content: 'This is a test note 3'
            }
        ]

        const notesFromDb = await db.insert(notes).values(notesToCreate).returning();
        const ids: number[] = notesFromDb.map(note => note.id);

        // fetch all notes
        const response = await request(app.getHttpServer())
            .get('/notes')
            .expect(200)

        const { body } = response;
        expect(body.length).toBe(notesFromDb.length);
        for (const note of body) {
            expect(ids).toContain(note.id);
        }

        // remove test data
        for (const id of ids)
            await db.delete(notes).where(eq(notes.id, id));
    })


    test('POST /notes should create a new note and return 201', async () => {
        // Create a note
        const note: CreateNoteDto = {
            title: 'Test Note Created',
            content: 'This is a test note created by integration test'
        }

        const response = await request(app.getHttpServer())
            .post('/notes')
            .send(note)
            .expect(201)

        // Assert that the note is created
        expect(response.body).toMatchObject<CreateNoteDto>(note);

        // Assert that the note persisted
        const { id } = response.body;
        const [noteFromDb] = await db.select().from(notes).where(eq(notes.id, id));
        expect(noteFromDb).toMatchObject<CreateNoteDto>(note);

        // remove test data
        await db.delete(notes).where(eq(notes.id, id));
    })

    test('GET /notes/:id should return the note with id :id', async () => {
        // create note to fetch later
        const note: CreateNoteDto = {
            title: 'Test Note to Fetch',
            content: 'This is a test note to check fetch integration test'
        }
        const [noteFromDb] = await db.insert(notes).values(note).returning();

        // fetch note with the id from the create response
        const { id } = noteFromDb;
        const response = await request(app.getHttpServer())
            .get(`/notes/${noteFromDb.id}`)
            .expect(200)

        // assert the note with the same id is returned
        const { body } = response;
        expect(body).toEqual(expect.objectContaining({
            id: noteFromDb.id,
            title: noteFromDb.title,
            content: noteFromDb.content,
            createdAt: noteFromDb.createdAt.toISOString(),
            updatedAt: noteFromDb.updatedAt.toISOString()
        }));

        // remove test data
        await db.delete(notes).where(eq(notes.id, id));
    })

    test('DELETE /notes/:id should delete the note with id :id', async () => {
        // create note to delete
        const note: CreateNoteDto = {
            title: 'Test Note to Delete',
            content: 'This is a test note to be deleted by integration test'
        }
        const [noteFromDb] = await db.insert(notes).values(note).returning();

        // delete note
        const { id } = noteFromDb;
        await request(app.getHttpServer())
            .delete(`/notes/${id}`)
            .expect(204)

        // assert note is deleted
        const [deletedNote] = await db.select().from(notes).where(eq(notes.id, id));
        expect(deletedNote).toBeUndefined();
    })

    test('PUT /notes/:id should update the note with id :id', async () => {
        // create note to update
        const note: CreateNoteDto = {
            title: 'Test Note to Update',
            content: 'This is a test note to be updated by integration test'
        }
        const [noteFromDb] = await db.insert(notes).values(note).returning();

        // update note
        const updatedNote: CreateNoteDto = {
            title: 'Updated Test Note',
            content: 'This is a test note to be updated by integration test'
        }
        const { id } = noteFromDb;
        const response = await request(app.getHttpServer())
            .put(`/notes/${id}`)
            .send(updatedNote)
            .expect(200)

        // assert note is updated
        const { body } = response;
        // expect(body).toEqual(expect.objectContaining({
        //     id: noteFromDb.id,
        //     title: updatedNote.title,
        //     content: updatedNote.content,
        //     createdAt: noteFromDb.createdAt.toISOString(),
        //     updatedAt: expect.not.stringMatching(noteFromDb.updatedAt.toISOString())
        // }));

        // remove test data
        await db.delete(notes).where(eq(notes.id, id));
    })
})