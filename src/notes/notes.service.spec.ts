import { mock, MockProxy, mockReset } from 'vitest-mock-extended';

import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesRepository } from './notes.repository';

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

    mockedNotesRepo.createNote.mockResolvedValue({
      ...dto,
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const response = await service.createNote(dto);
    expect(response).toMatchObject(dto)
  })
});