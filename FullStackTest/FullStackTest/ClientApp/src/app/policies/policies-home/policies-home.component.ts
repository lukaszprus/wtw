import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { PolicyAddEditFormComponent } from '../policy-add-edit-form/policy-add-edit-form.component';
import { Policy, PolicyService } from '../policy.service';

@Component({
  selector: 'app-policies-home',
  templateUrl: './policies-home.component.html'
})
export class PoliciesHomeComponent implements OnInit, OnDestroy {
  private subs: Subscription | undefined;
  policies: Policy[] | undefined;
  private readonly policyService = inject(PolicyService);
  @ViewChild(PolicyAddEditFormComponent) private readonly policyAddEditFormComponent!: PolicyAddEditFormComponent;

  deletePolicy(number: number) {
    this.policyService.delete(number)
      .subscribe(() => {
        const index = this.policies!.findIndex(policy => policy.number === number);

        if (index > -1) {
          const policies = [...this.policies!];

          policies.splice(index, 1);

          this.policies = policies;
        }
      });
  }

  addPolicy(policy: Policy) {
    this.policyService.add(policy)
      .subscribe({
        next: policy => {
          this.policies = [ ...(this.policies || []), policy ];
        },
        complete: () => {
          this.policyAddEditFormComponent.addEditForm.reset();
        }
      });
  }

  ngOnInit() {
    this.subs = this.policyService.getAll
      .subscribe(policies => {
        this.policies = policies;
      });
  }

  ngOnDestroy() {
    this.subs && this.subs.unsubscribe();
  }
}
