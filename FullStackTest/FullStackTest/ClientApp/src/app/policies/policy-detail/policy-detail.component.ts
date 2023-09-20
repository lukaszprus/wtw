import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PolicyService } from '../policy.service';

@Component({
  template: '<pre>{{ policy$ | async | json }}</pre>'
})
export class PolicyDetailComponent {
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly number = Number(this.activatedRoute.snapshot.params['number']!);
  protected readonly policyService = inject(PolicyService);
  readonly policy$ = this.policyService.get(this.number);
}
