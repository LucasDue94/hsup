import {Component, OnInit} from '@angular/core';
import {Fornecedor} from '../core/fornecedor/fornecedor';
import {FornecedorService} from '../core/fornecedor/fornecedor.service';

@Component({
  selector: 'fornecedor-list',
  templateUrl: './fornecedor-list.component.html'
})
export class FornecedorListComponent implements OnInit {

  fornecedorList: Fornecedor[] = [];

  constructor(private fornecedorService: FornecedorService) { }

  ngOnInit() {
    this.fornecedorService.list().subscribe((fornecedorList: Fornecedor[]) => {
      this.fornecedorList = fornecedorList;
    });
  }
}
