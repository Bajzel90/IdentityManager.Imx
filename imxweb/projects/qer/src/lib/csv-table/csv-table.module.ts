import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule, } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { EuiCoreModule } from '@elemental-ui/core';
import { MatPaginatorModule } from '@angular/material/paginator';

import { DataTableModule, RouteGuardService, CdrModule, LdsReplaceModule, MenuService, MenuItem } from 'qbm';
import { CsvTableComponent } from './csv-table.component';
import { MatCheckboxModule } from '@angular/material/checkbox';




const routes: Routes = [
  {
    path: 'csv-table',
    component: CsvTableComponent
  }
];

@NgModule({
  declarations: [
    CsvTableComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    LdsReplaceModule,
    MatStepperModule,
    CdrModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    DataTableModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatPaginatorModule,
    EuiCoreModule
  ],
  providers: [

  ],
  bootstrap: [CsvTableComponent]
})
export class CsvTableModule { 

  constructor(
    private readonly menuService: MenuService,
  ) {
    this.setupMenu();
  }

  private setupMenu(): void {
    this.menuService.addMenuFactories(
      (preProps: string[], groups: string[]) => {

        const items: MenuItem[] = [];
 
                  items.push(
           {
            id: 'QER_Csv_Table',
             route: 'csv-table',
            title: '#LDS#Menu ',
             sorting: '60-10',
         },
         );
        

        if (items.length === 0) {
          return null;
        }
        return {
          id: 'ROOT_CSV_Table',
          title: '#LDS#CSV Importer',
          sorting: '60',
          items
        };
      },
    );

}
}
