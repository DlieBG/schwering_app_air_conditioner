import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, timer, map } from 'rxjs';
import { AcService } from 'src/app/services/ac/ac.service';
import { Ac, AcStatus } from 'src/app/types/ac.type';
import { SetTimerComponent } from './set-timer/set-timer.component';

@Component({
  selector: 'app-ac-item',
  templateUrl: './ac-item.component.html',
  styleUrls: ['./ac-item.component.scss']
})
export class AcItemComponent implements OnInit {

  ac$!: Observable<Ac>;
  @Input() ac!: Ac;

  status$!: Observable<AcStatus>;
  status!: AcStatus;

  command: boolean = false;

  timer$: Observable<{ minutes: number, seconds: number } | null> = timer(0, 1000).pipe(
    map(() => {
      if(this.ac.timer) {
        let minutes = Math.abs(new Date().getTime() - new Date(this.ac.timer).getTime()) / (1000 * 60) % 60;

        return new Date() <= new Date(this.ac.timer) ? {
          minutes: Math.floor(Math.abs(new Date().getTime() - new Date(this.ac.timer).getTime()) / (1000 * 60) % 60),
          seconds: Math.floor((minutes - Math.floor(minutes)) * 60)
        } : null;
      }
      
      return null;
    })
  );

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private acService: AcService
  ) { }

  ngOnInit(): void {
    setInterval(() => {
      this.getAc();

      if(!this.command)
        this.getStatus();
    }, 5000);

    this.getStatus();
  }

  getAc() {
    this.ac$ = this.acService.getAc(this.ac.id);
    this.ac$.subscribe({
      next: (ac) => {
        this.ac = ac;
      }
    });
  }

  getStatus() {
    this.status$ = this.acService.getAcStatus(this.ac.id);
    this.status$.subscribe({
      next: (status) => {
        this.status = status;
      }
    });
  }

  setTimer() {
    let dialog = this.dialog.open(SetTimerComponent, { autoFocus: false });

    dialog.afterClosed().subscribe(
      (date: Date | null) => {
        if(date)
          this.acService.setTimer(this.ac.id, date).subscribe(
            () => {
              this.getAc();
              this.snackbar.open('Timer gestellt', '', { duration: 2500 });
            }
          );
      }
    );
  }

  deleteTimer() {
    this.acService.deleteTimer(this.ac.id).subscribe(
      () => {
        this.getAc();
      }
    );
  }

  powerChange(event: MatSlideToggleChange) {
    this.command = true;

    this.status.power = event.checked ? 'on' : 'off';

    this.deleteTimer();

    this.acService.setPower(this.ac.id, this.status.power).subscribe({
      next: (success) => {
        setTimeout(this.getStatus, 1500);
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
        setTimeout(this.getStatus, 1500);
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
        setTimeout(this.getStatus, 1500);
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
        setTimeout(this.getStatus, 1500);
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
        setTimeout(this.getStatus, 1500);
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
        setTimeout(this.getStatus, 1500);
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
        setTimeout(this.getStatus, 1500);
        this.command = false;
      },
      error: (error) => {

      }
    });
  }

}
