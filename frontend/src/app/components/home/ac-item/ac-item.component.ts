import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { interval, Observable } from 'rxjs';
import { AcService } from 'src/app/services/ac/ac.service';
import { Ac, AcStatus } from 'src/app/types/ac.type';

@Component({
  selector: 'app-ac-item',
  templateUrl: './ac-item.component.html',
  styleUrls: ['./ac-item.component.scss']
})
export class AcItemComponent implements OnInit {

  @Input() ac!: Ac;

  status$!: Observable<AcStatus>;
  status!: AcStatus;

  command: boolean = false;

  constructor(
    private acService: AcService
  ) { }

  ngOnInit(): void {
    setInterval(() => {
      if(!this.command)
        this.getStatus();
    }, 5000);

    this.getStatus();
  }

  getStatus() {
    this.status$ = this.acService.getAcStatus(this.ac.id);
    this.status$.subscribe({
      next: (status) => {
        this.status = status;
      }
    });
  }

  powerChange(event: MatSlideToggleChange) {
    this.command = true;

    this.status.power = event.checked ? 'on' : 'off';

    this.acService.setPower(this.ac.id, this.status.power).subscribe({
      next: (success) => {
        setTimeout(this.getStatus, 1000);
        this.command = false;
      },
      error: (error) => {

      }
    });
  }

  temperatureDecrease() {
    this.command = true;

    this.status.temperatureSetpoint -= 1;

    this.acService.setTemperature(this.ac.id, this.status.temperatureSetpoint).subscribe({
      next: (success) => {
        setTimeout(this.getStatus, 1000);
        this.command = false;
      },
      error: (error) => {

      }
    });
  }

  temperatureIncrease() {
    this.command = true;

    this.status.temperatureSetpoint += 1;

    this.acService.setTemperature(this.ac.id, this.status.temperatureSetpoint).subscribe({
      next: (success) => {
        setTimeout(this.getStatus, 1000);
        this.command = false;
      },
      error: (error) => {

      }
    });
  }

  modeChange() {
    this.command = true;

    this.acService.setMode(this.ac.id, this.status.mode).subscribe({
      next: (success) => {
        setTimeout(this.getStatus, 1000);
        this.command = false;
      },
      error: (error) => {

      }
    });
  }

  windModeChange() {
    this.command = true;

    this.acService.setWindMode(this.ac.id, this.status.windMode).subscribe({
      next: (success) => {
        setTimeout(this.getStatus, 1000);
        this.command = false;
      },
      error: (error) => {

      }
    });
  }

  windSpeedChange() {
    this.command = true;

    this.acService.setWindSpeed(this.ac.id, this.status.windSpeed).subscribe({
      next: (success) => {
        setTimeout(this.getStatus, 1000);
        this.command = false;
      },
      error: (error) => {

      }
    });
  }

  windDirectionChange() {
    this.command = true;

    this.acService.setWindDirection(this.ac.id, this.status.windDirection).subscribe({
      next: (success) => {
        setTimeout(this.getStatus, 1000);
        this.command = false;
      },
      error: (error) => {

      }
    });
  }

}
