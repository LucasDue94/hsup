import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'almoxarife',
  templateUrl: './almoxarife.component.html',
  styleUrls: ['./almoxarife.component.scss']
})
export class AlmoxarifeComponent implements OnInit {

    @Input() itemsSolicitacao;
  constructor() { }

  ngOnInit() {
  }

}
