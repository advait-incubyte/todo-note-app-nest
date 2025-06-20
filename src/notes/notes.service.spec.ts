import { mock, MockProxy, mockReset } from 'vitest-mock-extended';

import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesRepository } from './notes.repository';
import { notes as noteSchema } from './schema';
import { UpdateNoteDto } from './dto/update-note.dto';

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
    const mockResponseValue: Note = {
      ...dto,
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    mockedNotesRepo.createNote.mockResolvedValue(mockResponseValue);

    const response: Note = await service.createNote(dto);
    expect(response).toEqual(mockResponseValue);
  })

  it('should get all notes', async () => {
    const mockResponseValue: Note[] = [
      {
        id: 1,
        title: 'Note 1',
        content: 'Contents of note 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'Note 2',
        content: 'Contents of note 2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: 'Note 3',
        content: 'Contents of note 3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    mockedNotesRepo.getNotes.mockResolvedValue(mockResponseValue);
    
    const response = await service.getNotes();
    expect(response).toEqual(expect.arrayContaining(mockResponseValue));
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
    expect(response).toEqual<Note>({
      id: mockResponseValue.id,
      title: mockResponseValue.title,
      content: mockResponseValue.content,
      createdAt: mockResponseValue.createdAt,
      updatedAt: mockResponseValue.updatedAt
    })
    expect(mockedNotesRepo.getNote).toHaveBeenCalledWith(1);
  })

  it('should update a note by id', async () => {
    const id = 1;
    const dto: UpdateNoteDto = {
      title: 'Updated Note',
      content: 'Contents of the updated note'
    }
    const mockResponseValue: Note = {
      id,
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    mockedNotesRepo.updateNote.mockResolvedValue(mockResponseValue);
    const response = await service.updateNote(id, dto);
    expect(response).toEqual<Note>({
      ...mockResponseValue,
      ...dto
    })
    expect(mockedNotesRepo.updateNote).toHaveBeenCalledWith(id, dto);
  })

  it('should delete a note by id', async () => {
    mockedNotesRepo.deleteNote.mockResolvedValue(undefined);

    const response = await service.deleteNote(1);
    expect(response).toBeUndefined();
    expect(mockedNotesRepo.deleteNote).toHaveBeenCalledWith(1);
  })
});