import { Injectable } from '@nestjs/common';
import { SessionsRepository } from './sessions.repository';
import { GetSessionsByFilterResponse } from './dto/session-response.dto';
import { GetSessionsRequestDTO } from './dto/get-session-request.dto';
import { MAX_SESSION_PER_PAGE } from 'src/utils';

@Injectable()
export class SessionsService {
  constructor(private readonly sessionsRepository: SessionsRepository) {}

  async GetSessionsByFilter(
    filter: GetSessionsRequestDTO,
  ): Promise<GetSessionsByFilterResponse[]> {
    const sessions = await this.sessionsRepository.getSessionsByFilter(filter);
    return sessions.slice(0, MAX_SESSION_PER_PAGE);
  }
}
