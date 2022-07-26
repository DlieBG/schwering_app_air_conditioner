import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './set-timer.component.html',
  styleUrls: ['./set-timer.component.scss']
})
export class SetTimerComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<SetTimerComponent>
  ) { }

  ngOnInit(): void {
  }

  setTimer(minutes: number) {
    this.dialogRef.close(new Date(new Date().getTime() + minutes * 60000));
  }

}
