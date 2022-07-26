import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbService } from './services/db/db.service';
import { AcController } from './controllers/ac/ac.controller';
import { AcService } from './services/ac/ac.service';
import { TimerService } from './services/timer/timer.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot()
  ],
  controllers: [AppController, AcController],
  providers: [AppService, DbService, AcService, TimerService],
})
export class AppModule {}
