import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresDatabaseModule } from './infrastructure/database/postgres.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration globally available
      envFilePath: '.env', // Load environment variables from .env file
    }),
    PostgresDatabaseModule, // Import the Postgres database module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
