import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import {
  GetSessionsByFilterResponse,
  SessionProgramResponse,
} from './dto/session-response.dto';

@Injectable()
export class SessionsRepository {
  constructor(
    private readonly httpClient: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getSessionsByFilter(
    filter: Record<string, any>,
  ): Promise<GetSessionsByFilterResponse[]> {
    const URL =
      this.configService.get<string>('SESSION_EXTERNAL_URL') ||
      'https://api.entrylevel.net/test/sessions';
    try {
      const { data = [] } = await this.httpClient.get(`${URL}`).toPromise();
      if (data.length == 0) {
        return [];
      }
      let sessions = data;
      const programWithSessions = {};
      data.forEach((session) => {
        const { program = [] } = session;
        program.forEach((item) => {
          const { short_title } = item;

          if (!programWithSessions[`${short_title}`]) {
            programWithSessions[`${short_title}`] = { ...item };
            programWithSessions[`${short_title}`].sessions = [session];
          } else {
            programWithSessions[`${short_title}`].sessions.push(session);
          }
        });
      });
      const { status, shortTitle } = filter;
      if (shortTitle) {
        sessions = [...programWithSessions[shortTitle].sessions];
      }
      if (status) {
        sessions = sessions.filter(
          (session) => session.status === status.toUpperCase(),
        );
      }
      const result = [];
      sessions.forEach((session) => {
        const {
          id,
          name,
          status,
          start_date,
          end_date,
          created_at,
          program = [],
        } = session;
        const sessionProgram = program[0] as SessionProgramResponse;
        result.push({
          id,
          name,
          status,
          start_date,
          end_date,
          created_at,
          program: sessionProgram,
        } as GetSessionsByFilterResponse);
      });
      result.sort((a, b) => {
        return moment(b.start_date).unix() - moment(a.start_date).unix();
      });
      return result;
    } catch (error) {
      console.log('get error from fetching data from external server', error);
      throw new BadRequestException(`something went wrong with session server`);
    }
  }
}
