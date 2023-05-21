import { IsOptional } from 'class-validator';
import { ProgramShortTitle, ProgramStatus } from '../sessions.enum';

export class GetSessionsRequestDTO {
  @IsOptional()
  status: ProgramStatus;

  @IsOptional()
  shortTitle: ProgramShortTitle;
}
