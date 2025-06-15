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

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: 'NotesRepository',
          useValue: mockedNotesRepo,
        }
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  afterAll(() => {
    mockReset(mockedNotesRepo);
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new note', () => {
    const dto: CreateNoteDto = {
      title: 'New Note',
      content: 'Contents of the new note'
    }

    mockedNotesRepo.createNote.mockResolvedValue(dto);
    const response = service.createNote(dto);
    expect(response).toEqual(dto)
  })
});
