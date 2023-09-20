import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliciesRoutingModule } from './policies-routing.module';
import { PolicyService } from './policy.service';
import { PoliciesListComponent } from './policies-list/policies-list.component';
import { PolicyDetailComponent } from './policy-detail/policy-detail.component';
import { PolicyAddEditFormComponent } from './policy-add-edit-form/policy-add-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PolicyEditComponent } from './policy-edit/policy-edit.component';
import { PoliciesHomeComponent } from './policies-home/policies-home.component';

@NgModule({
  declarations: [
    PoliciesListComponent,
    PolicyDetailComponent,
    PolicyAddEditFormComponent,
    PolicyEditComponent,
    PoliciesHomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PoliciesRoutingModule
  ],
  providers: [PolicyService]
})
export class PoliciesModule {}
