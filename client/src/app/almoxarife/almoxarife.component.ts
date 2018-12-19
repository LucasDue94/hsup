import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'almoxarife',
  templateUrl: './almoxarife.component.html',
  styleUrls: ['./almoxarife.component.scss']
})
export class AlmoxarifeComponent implements OnInit {

    @Input() itemsRequest;
    sector = 'Tecnologia da Informação';
    requestNumber = '0001';
    date = '19/12/2018';
    requestUser = 'Beroaldo da Silva Carneiro';
    statusStock = 'ok';
  constructor() { }

  ngOnInit() {
  }

}
