import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociadosComponent } from './Gestao/associados/associados.component';

const routes: Routes = [
  { path: '', component: AssociadosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
