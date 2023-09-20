import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PoliciesHomeComponent } from './policies-home/policies-home.component';
import { PolicyDetailComponent } from './policy-detail/policy-detail.component';
import { PolicyEditComponent } from './policy-edit/policy-edit.component';

const routes: Routes = [
  { path: '', component: PoliciesHomeComponent },
  { path: ':number', component: PolicyDetailComponent },
  { path: ':number/edit', component: PolicyEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliciesRoutingModule {}
