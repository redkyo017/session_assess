import { configProvider } from './config.provider';

import { Module } from '@nestjs/common';

@Module({
  providers: [configProvider],
  exports: [configProvider],
})
export class ConfigModule {}
