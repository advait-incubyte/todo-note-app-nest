import { mock, MockProxy, mockReset } from 'vitest-mock-extended';
import { HttpStatus } from '@nestjs/common';

import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesRepository } from './notes.repository';
import { notes as noteSchema } from './schema';

type Note = typeof noteSchema.$inferSelect;

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

    const response: Note = await service.createNote(dto);
    expect(response).toMatchObject(dto)
  })

  it('should get a note by id', async () => {
    const mockResponseValue = {
      id: 1,
      title: 'New Note',
      content: 'Contents of the new note',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    mockedNotesRepo.getNote.mockResolvedValue(mockResponseValue);

    const response = await service.getNote(1);

    expect(response.id).toBe(1);
    expect(response).toMatchObject<Note>({
      id: mockResponseValue.id,
      title: mockResponseValue.title,
      content: mockResponseValue.content,
      createdAt: mockResponseValue.createdAt,
      updatedAt: mockResponseValue.updatedAt
    })
    expect(mockedNotesRepo.getNote).toHaveBeenCalledWith(1);
  })

  it('should delete a note by id', async () => {
    mockedNotesRepo.deleteNote.mockResolvedValue(undefined);

    const response = await service.deleteNote(1);
    expect(response).toBeUndefined();
    expect(mockedNotesRepo.deleteNote).toHaveBeenCalledWith(1);
  })
});