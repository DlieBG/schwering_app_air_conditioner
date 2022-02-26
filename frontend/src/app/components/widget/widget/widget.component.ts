import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AcService } from 'src/app/services/ac/ac.service';
import { Ac } from 'src/app/types/ac.type';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  acs$!: Observable<Ac[]>;

  constructor(
    private acService: AcService
  ) { }

  ngOnInit(): void {
    this.getAcs();
  }

  getAcs() {
    this.acs$ = this.acService.getAcs();
  }

}
