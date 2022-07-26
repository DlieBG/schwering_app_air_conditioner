import { Injectable } from '@nestjs/common';
import { AcService } from '../ac/ac.service';
import { Cron } from '@nestjs/schedule';
import { DbService } from '../db/db.service';
import { Ac } from 'src/types/ac.type';

@Injectable()
export class TimerService {

    constructor(
        private dbService: DbService,
        private acService: AcService
    ) { }

    @Cron('*/15 * * * * *')
    checkTimer() {
        this.dbService
            .getCollection('devices')
            .find<Ac>({})
            .sort({ sort: 1 })
            .toArray()
            .then(
                (acs: Ac[]) => {
                    acs.forEach(
                        (ac: Ac) => {
                            if (ac.timer) {
                                if(new Date() >= new Date(ac.timer)) {
                                    this.acService.setPower(ac.id, 'off');
                                    this.dbService.getCollection('devices').updateOne({ id: ac.id }, { $set: { timer: null } });
                                }
                            
                            }
                        }
                    );
                }
            );
    }

}
