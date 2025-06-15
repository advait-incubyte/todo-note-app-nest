import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { describe, it, expect, afterAll } from "vitest";
import { NotesModule } from "./notes.module";

describe('Notes Integration', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [NotesModule],
        }).compile()

        app = module.createNestApplication();
        await app.init();
    })

    afterAll(async () => {
        await app.close();
    })

    it('should be defined', () => {
        expect(app).toBeDefined();
    })
})