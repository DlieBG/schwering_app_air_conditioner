import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ac, AcStatus, ModeEnum, PowerEnum, WindDirectionEnum, WindModeEnum, WindSpeedEnum } from 'src/app/types/ac.type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAcs(): Observable<Ac[]> {
    return this.httpClient.get<Ac[]>(`${environment.api}/ac`);
  }

  getAc(id: string): Observable<Ac> {
    return this.httpClient.get<Ac>(`${environment.api}/ac/${id}`);
  }

  setTimer(id: string, date: Date): Observable<any> {
    return this.httpClient.post(`${environment.api}/ac/${id}/timer`, { date });
  }

  deleteTimer(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.api}/ac/${id}/timer`);
  }

  getAcStatus(id: string): Observable<AcStatus> {
    return this.httpClient.get<AcStatus>(`${environment.api}/ac/${id}/status`);
  }

  setPower(id: string, value: PowerEnum): Observable<boolean> {
    return this.httpClient.patch<boolean>(`${environment.api}/ac/${id}/power/${value}`, {});
  }

  setTemperature(id: string, value: number): Observable<boolean> {
    return this.httpClient.patch<boolean>(`${environment.api}/ac/${id}/temperature/${value}`, {});
  }

  setMode(id: string, value: ModeEnum): Observable<boolean> {
    return this.httpClient.patch<boolean>(`${environment.api}/ac/${id}/mode/${value}`, {});
  }

  setWindMode(id: string, value: WindModeEnum): Observable<boolean> {
    return this.httpClient.patch<boolean>(`${environment.api}/ac/${id}/wind-mode/${value}`, {});
  }

  setWindSpeed(id: string, value: WindSpeedEnum): Observable<boolean> {
    return this.httpClient.patch<boolean>(`${environment.api}/ac/${id}/wind-speed/${value}`, {});
  }

  setWindDirection(id: string, value: WindDirectionEnum): Observable<boolean> {
    return this.httpClient.patch<boolean>(`${environment.api}/ac/${id}/wind-direction/${value}`, {});
  }

}
