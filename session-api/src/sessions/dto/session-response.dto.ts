import { ProgramShortTitle, ProgramStatus } from '../sessions.enum';
export interface SessionProgramResponse {
  id: string;
  display_title: string;
  thumbnail_img_url: string;
  short_title: ProgramShortTitle;
}

export interface GetSessionsByFilterResponse {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  created_at: string;
  status: ProgramStatus;
  program: SessionProgramResponse;
}
