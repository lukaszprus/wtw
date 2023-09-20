import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Policy } from '../policy.service';

@Component({
  selector: 'app-policies-list',
  templateUrl: './policies-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoliciesListComponent {
  @Input() policies: Policy[] | null | undefined;
  @Output() delete = new EventEmitter<number>();
}
