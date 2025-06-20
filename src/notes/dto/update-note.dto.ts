import { IsNotEmpty, IsString } from "class-validator"

export class UpdateNoteDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    content: string
}