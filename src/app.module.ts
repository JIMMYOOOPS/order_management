import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresDatabaseModule } from './infrastructure/database/postgres/postgres.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './application/module/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration globally available
      envFilePath: '.env', // Load environment variables from .env file
    }),
    PostgresDatabaseModule, // Import the Postgres database module
    OrderModule, // Import the Order module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
