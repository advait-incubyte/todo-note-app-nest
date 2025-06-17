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
            title: 'Test Note',
            content: 'This is a test note'
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
})