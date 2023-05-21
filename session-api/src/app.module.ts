import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SessionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
