import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuService } from 'qbm';

@Component({
  selector: 'imx-bulk-importer',
  templateUrl: './bulk-importer.component.html',
  styleUrls: ['./bulk-importer.component.scss']
})
export class BulkImporterComponent implements OnInit {
  _subscription: Subscription;
  menuAttr: string;
  
  constructor(private menuService: MenuService) {
    this._subscription = menuService.submenuAttr.subscribe(
      value => {
        this.menuAttr = value;
        console.log(this.menuAttr);
      }
    )
   }
  
  ngOnInit(): void {
    
  }

}
