import { Component, OnInit } from '@angular/core';

import { MenuService } from 'qbm';

@Component({
  selector: 'imx-bulk-importer',
  templateUrl: './bulk-importer.component.html',
  styleUrls: ['./bulk-importer.component.scss']
})
export class BulkImporterComponent implements OnInit {

  constructor(private menuService: MenuService) { }
  
  ngOnInit(): void {
  console.log(this.menuService.submenuIdentifier);
  }

}
