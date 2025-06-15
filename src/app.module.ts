import { Module, ModuleMetadata } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';

const metadata: ModuleMetadata = {
  imports: [NotesModule],
}
@Module(metadata)
export class AppModule {}
