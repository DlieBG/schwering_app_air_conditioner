import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AcService } from 'src/app/services/ac/ac.service';
import { Ac, AcStatus } from 'src/app/types/ac.type';

@Component({
  selector: 'app-preview-item',
  templateUrl: './preview-item.component.html',
  styleUrls: ['./preview-item.component.scss']
})
export class PreviewItemComponent implements OnInit {

  @Input() ac!: Ac;

  status$!: Observable<AcStatus>;
  status!: AcStatus;

  constructor(
    private acService: AcService
  ) { }

  ngOnInit(): void {
    setInterval(() => {
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

}
