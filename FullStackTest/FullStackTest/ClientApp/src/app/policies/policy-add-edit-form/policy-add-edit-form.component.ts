import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { Gender, Policy } from '../policy.service';

@Component({
  selector: 'app-policy-add-edit-form',
  templateUrl: './policy-add-edit-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolicyAddEditFormComponent implements OnChanges, OnInit {
  @Input() label!: string;
  @Input() value: Policy | null | undefined;
  @Input() disabledNumber = false;
  @Output() valueChange = new EventEmitter<Policy>();

  number = new FormControl<number | null>(null, [Validators.required, Validators.min(1)]);
  holderName = new FormControl<string | null>(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]);
  holderAge = new FormControl<number | null>(null, [Validators.required, Validators.min(20), Validators.max(200)]);
  holderGender = new FormControl<Gender | null>(null, [Validators.required]);

  addEditForm = new FormGroup({
    number: this.number,
    holder: new FormGroup({
      name: this.holderName,
      age: this.holderAge,
      gender: this.holderGender
    })
  });

  onSubmit() {
    this.valueChange.emit(this.addEditForm.value as Policy);
  }

  ngOnChanges(changes: SimpleChanges) {
    changes.value && (this.value ? this.addEditForm.setValue(this.value) : this.addEditForm.reset());
  }

  ngOnInit() {
    this.disabledNumber && this.number.disable();
  }
}
