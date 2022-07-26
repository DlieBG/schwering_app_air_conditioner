import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { resolveSoa } from 'dns';
import { ObjectId, UpdateResult } from 'mongodb';
import { Authorization } from 'src/decorators/authorization.decorator';
import { AcService } from 'src/services/ac/ac.service';
import { DbService } from 'src/services/db/db.service';
import { Ac, AcStatus, ModeEnum, PowerEnum, WindDirectionEnum, WindModeEnum, WindSpeedEnum } from 'src/types/ac.type';
import { LoginJwt } from 'src/types/login.type';

@Controller('ac')
export class AcController {

    constructor(
        private dbService: DbService,
        private acService: AcService
    ) { }

    @Get()
    async getAcs(@Authorization() loginJwt: LoginJwt): Promise<Ac[]> {
        return this.dbService.getCollection('devices').find<Ac>({}).sort({ sort: 1 }).toArray();
    }

    @Get(':id')
    async getAc(@Authorization() loginJwt: LoginJwt, @Param('id') id: string): Promise<Ac> {
        return this.dbService.getCollection('devices').findOne<Ac>({ id });
    }

    @Post(':id/timer')
    async setTimer(@Authorization() loginJwt: LoginJwt, @Param('id') id: string, @Body() body: { date: Date }): Promise<UpdateResult> {
        return this.dbService.getCollection('devices').updateOne({ id }, { $set: { timer: body.date } });
    }

    @Delete(':id/timer')
    async deleteTimer(@Authorization() loginJwt: LoginJwt, @Param('id') id: string): Promise<UpdateResult> {
        return this.dbService.getCollection('devices').updateOne({ id }, { $set: { timer: null } });
    }

    @Get(':id/status')
    async getAcStatus(@Authorization() loginJwt: LoginJwt, @Param('id') id: string): Promise<AcStatus> {
        return this.acService.getStatus(id);
    }

    @Patch(':id/power/:value')
    async setPower(@Authorization() loginJwt: LoginJwt, @Param('id') id: string, @Param('value') value: PowerEnum): Promise<boolean> {
        return this.acService.setPower(id, value);
    }

    @Patch(':id/temperature/:value')
    async setTemperature(@Authorization() loginJwt: LoginJwt, @Param('id') id: string, @Param('value') value: number): Promise<boolean> {
        return this.acService.setTemperature(id, value);
    }

    @Patch(':id/mode/:value')
    async setMode(@Authorization() loginJwt: LoginJwt, @Param('id') id: string, @Param('value') value: ModeEnum): Promise<boolean> {
        return this.acService.setMode(id, value);
    }

    @Patch(':id/wind-mode/:value')
    async setWindMode(@Authorization() loginJwt: LoginJwt, @Param('id') id: string, @Param('value') value: WindModeEnum): Promise<boolean> {
        return this.acService.setWindMode(id, value);
    }

    @Patch(':id/wind-speed/:value')
    async setWindSpeed(@Authorization() loginJwt: LoginJwt, @Param('id') id: string, @Param('value') value: WindSpeedEnum): Promise<boolean> {
        return this.acService.setWindSpeed(id, value);
    }

    @Patch(':id/wind-direction/:value')
    async setWindDirection(@Authorization() loginJwt: LoginJwt, @Param('id') id: string, @Param('value') value: WindDirectionEnum): Promise<boolean> {
        return this.acService.setWindDirection(id, value);
    }

}
