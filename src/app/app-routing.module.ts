import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableWarehouseComponent } from './table-warehouse/table-warehouse.component';
import { DetailWarehouseComponent } from './detail-warehouse/detail-warehouse.component';

const routes: Routes = [
  { path: '', component: TableWarehouseComponent },
  { path: 'detail', component: DetailWarehouseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
