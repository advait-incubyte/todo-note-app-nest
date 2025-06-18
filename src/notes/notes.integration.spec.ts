import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { drizzle } from "drizzle-orm/node-postgres";
import { ConfigService } from "@nestjs/config";

import { AppModule } from "../app.module";
import { DATABASE_CONNECTION } from "../drizzle/constants";
import { schema } from "../drizzle/globalSchema";
import { CreateNoteDto } from "./dto/create-note.dto";

describe('Notes Integration', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
        })
        .overrideProvider(DATABASE_CONNECTION)
        .useFactory({
            factory: (configService: ConfigService) => {
                const db = drizzle(configService.getOrThrow('TEST_DATABASE_URL'), { schema })
                return db;
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

    it('POST /notes should create a new note and return 201', async () => {
        const note: CreateNoteDto = {
            title: 'Test Note Created',
            content: 'This is a test note created by integration test'
        }

        const response = await request(app.getHttpServer())
            .post('/notes')
            .send(note)
            .expect(201)

        // toMatchObject does partial matching
        expect(response.body).toMatchObject<CreateNoteDto>(note);

        // check persistence
        const { id } = response.body;
        const getResponse = await request(app.getHttpServer())
            .get(`/notes/${id}`)
            .expect(200)

        expect(getResponse.body).toMatchObject<CreateNoteDto>(note);

        // remove test data
        await request(app.getHttpServer())
            .delete(`/notes/${id}`)
            .expect(204)
    })

    it('GET /notes/:id should return the note with id :id', async () => {
        // create note to fetch later
        const note: CreateNoteDto = {
            title: 'Test Note to Fetch',
            content: 'This is a test note to check fetch integration test'
        }
        const createResponse = await request(app.getHttpServer())
            .post('/notes')
            .send(note)
            .expect(201)

        // fetch note with the id from the create response
        const { id } = createResponse.body;
        const response = await request(app.getHttpServer())
            .get(`/notes/${id}`)
            .expect(200)

        // assert the note with the same id is returned
        const { body } = response;
        expect(body).toMatchObject<CreateNoteDto>(note);
        expect(body.id).toBe(id);

        // remove test data
        await request(app.getHttpServer())
            .delete(`/notes/${id}`)
            .expect(204)
    })

    it('DELETE /notes/:id should delete the note with id :id', async () => {
        // create note to delete
        const note: CreateNoteDto = {
            title: 'Test Note to Delete',
            content: 'This is a test note to be deleted by integration test'
        }
        const createResponse = await request(app.getHttpServer())
            .post('/notes')
            .send(note)
            .expect(201)

        // delete note
        const { id } = createResponse.body;
        await request(app.getHttpServer())
            .delete(`/notes/${id}`)
            .expect(204)

        // assert note is deleted
        const getResponse = await request(app.getHttpServer())
            .get(`/notes/${id}`)
            .expect(404)

        expect(getResponse.body).toBeNull();
    })
})