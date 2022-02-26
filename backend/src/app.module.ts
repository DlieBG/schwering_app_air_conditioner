import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbService } from './services/db/db.service';
import { AcController } from './controllers/ac/ac.controller';
import { AcService } from './services/ac/ac.service';

@Module({
  imports: [
    ConfigModule.forRoot()
  ],
  controllers: [AppController, AcController],
  providers: [AppService, DbService, AcService],
})
export class AppModule {}
