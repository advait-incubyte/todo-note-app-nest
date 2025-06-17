import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { NotesModule } from "./notes.module";

describe('Notes Integration', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [NotesModule],
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
        const note = {
            title: 'Test Note',
            content: 'This is a test note'
        }

        const response = await request(app.getHttpServer())
            .post('/notes')
            .send(note)
            .expect(201)
            .expect(note);

        const { id } = response.body;

        const getResponse = await request(app.getHttpServer())
            .get(`/notes/${id}`)
            .expect(200)
            .expect(note);
    })
})