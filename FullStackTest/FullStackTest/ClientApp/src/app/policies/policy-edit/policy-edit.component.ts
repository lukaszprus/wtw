import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { PolicyDetailComponent } from '../policy-detail/policy-detail.component';
import { Policy } from '../policy.service';

@Component({
  templateUrl: './policy-edit.component.html'
})
export class PolicyEditComponent extends PolicyDetailComponent {
  private readonly router = inject(Router);

  updatePolicy(policy: Policy) {
    this.policyService.update(this.number, policy)
      .subscribe(() => {
        this.router.navigate(['../..'], { relativeTo: this.activatedRoute });
      });
  }
}
