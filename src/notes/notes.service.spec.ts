import { Test, TestingModule } from '@nestjs/testing';
import { mock, MockProxy, mockReset } from 'vitest-mock-extended';

import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';

interface NotesRepository {
  createNote: (createNoteDto: CreateNoteDto) => Promise<CreateNoteDto>;
}

describe('Notes Service', () => {
  let service: NotesService;
  let mockedNotesRepo: MockProxy<NotesRepository>;

  beforeEach(async () => {
    mockedNotesRepo = mock<NotesRepository>();
    service = new NotesService(mockedNotesRepo);
  });

  afterEach(() => {
    mockReset(mockedNotesRepo);
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new note', async () => {
    const dto: CreateNoteDto = {
      title: 'New Note',
      content: 'Contents of the new note'
    }

    mockedNotesRepo.createNote.mockResolvedValue(dto);
    const response = await service.createNote(dto);
    expect(response).toEqual(dto)
  })
});
