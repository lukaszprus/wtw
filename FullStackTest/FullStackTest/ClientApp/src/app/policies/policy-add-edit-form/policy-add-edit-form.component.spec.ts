import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { PolicyAddEditFormComponent } from './policy-add-edit-form.component';
import { Policy } from '../policy.service';

const setValue = (debugElement: DebugElement, value: string) => {
  const nativeElement = debugElement.nativeElement;

  nativeElement.value = value;
  nativeElement.dispatchEvent(new Event('input'));
  nativeElement.dispatchEvent(new Event('blur'));
};

describe('PolicyAddEditFormComponent', () => {
  let component: PolicyAddEditFormComponent;
  let fixture: ComponentFixture<PolicyAddEditFormComponent>;
  let number: DebugElement,
    holderName: DebugElement,
    holderAge: DebugElement,
    holderGender: DebugElement,
    numberInput: DebugElement,
    holderNameInput: DebugElement,
    holderAgeInput: DebugElement,
    holderGenderInputWrapper: DebugElement,
    submitButton: DebugElement;

  const errors = (debugElement: DebugElement) => debugElement.queryAll(By.css('.invalid-feedback'));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PolicyAddEditFormComponent]
    });

    fixture = TestBed.createComponent(PolicyAddEditFormComponent);
    component = fixture.componentInstance;
    component.label = 'Add';
    fixture.detectChanges();

    const testElement = (name: string) => fixture.debugElement.query(By.css(`[data-test-${name}]`));
    const input = (debugElement: DebugElement) => debugElement.query(By.css('input'));

    number = testElement('number');
    holderName = testElement('holderName');
    holderAge = testElement('holderAge');
    holderGender = testElement('holderGender');

    numberInput = input(number);
    holderNameInput = input(holderName);
    holderAgeInput = input(holderAge);
    holderGenderInputWrapper = holderGender.query(By.css('[data-test-holderGenderInputWrapper]'));

    submitButton = fixture.debugElement.query(By.css(`[type="submit"]`));
  });

  describe('when not filled out', () => {
    describe('shows field validation errors and erroneous state', () => {
      it('when field interacted with', () => {
        expect(errors(number).length).toBe(0);
        expect(errors(holderName).length).toBe(0);
        expect(errors(holderAge).length).toBe(0);
        expect(errors(holderGender).length).toBe(0);

        expect('is-valid' in numberInput.classes).toBe(false);
        expect('is-invalid' in numberInput.classes).toBe(false);

        expect('is-valid' in holderNameInput.classes).toBe(false);
        expect('is-invalid' in holderNameInput.classes).toBe(false);

        expect('is-valid' in holderAgeInput.classes).toBe(false);
        expect('is-invalid' in holderAgeInput.classes).toBe(false);

        expect('is-valid' in holderGenderInputWrapper.classes).toBe(false);
        expect('is-invalid' in holderGenderInputWrapper.classes).toBe(false);

        holderNameInput.nativeElement.dispatchEvent(new Event('blur'));
        holderAgeInput.nativeElement.dispatchEvent(new Event('blur'));

        fixture.detectChanges();

        expect(errors(number).length).toBe(0);
        expect(errors(holderName).length).toBeGreaterThan(0);
        expect(errors(holderAge).length).toBeGreaterThan(0);
        expect(errors(holderGender).length).toBe(0);

        expect('is-valid' in numberInput.classes).toBe(false);
        expect('is-invalid' in numberInput.classes).toBe(false);

        expect('is-valid' in holderNameInput.classes).toBe(false);
        expect('is-invalid' in holderNameInput.classes).toBe(true);

        expect('is-valid' in holderAgeInput.classes).toBe(false);
        expect('is-invalid' in holderAgeInput.classes).toBe(true);

        expect('is-valid' in holderGenderInputWrapper.classes).toBe(false);
        expect('is-invalid' in holderGenderInputWrapper.classes).toBe(false);
      });

      it('when submitted', () => {
        submitButton.nativeElement.click();

        fixture.detectChanges();

        expect(errors(number).length).toBeGreaterThan(0);
        expect(errors(holderName).length).toBeGreaterThan(0);
        expect(errors(holderAge).length).toBeGreaterThan(0);
        expect(errors(holderGender).length).toBeGreaterThan(0);

        expect('is-valid' in numberInput.classes).toBe(false);
        expect('is-invalid' in numberInput.classes).toBe(true);

        expect('is-valid' in holderNameInput.classes).toBe(false);
        expect('is-invalid' in holderNameInput.classes).toBe(true);

        expect('is-valid' in holderAgeInput.classes).toBe(false);
        expect('is-invalid' in holderAgeInput.classes).toBe(true);

        expect('is-valid' in holderGenderInputWrapper.classes).toBe(false);
        expect('is-invalid' in holderGenderInputWrapper.classes).toBe(true);
      });
    });

    it('does not emit when submitted', () => {
      const spy = spyOn(component.valueChange, 'emit').and.callThrough();

      submitButton.nativeElement.click();

      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('when filled out correctly', () => {
    beforeEach(() => {
      setValue(numberInput, '654765');
      setValue(holderNameInput, 'Lukasz Prus');
      setValue(holderAgeInput, '40');

      const male = holderGenderInputWrapper.query(By.css('input')).nativeElement;

      male.click();
      male.dispatchEvent(new Event('blur'));

      fixture.detectChanges();
    });

    it('shows no field validation errors nor erroneous state', () => {
      expect(errors(number).length).toBe(0);
      expect(errors(holderName).length).toBe(0);
      expect(errors(holderAge).length).toBe(0);
      expect(errors(holderGenderInputWrapper).length).toBe(0);

      expect('is-valid' in numberInput.classes).toBe(true);
      expect('is-invalid' in numberInput.classes).toBe(false);

      expect('is-valid' in holderNameInput.classes).toBe(true);
      expect('is-invalid' in holderNameInput.classes).toBe(false);

      expect('is-valid' in holderAgeInput.classes).toBe(true);
      expect('is-invalid' in holderAgeInput.classes).toBe(false);

      expect('is-valid' in holderGenderInputWrapper.classes).toBe(true);
      expect('is-invalid' in holderGenderInputWrapper.classes).toBe(false);
    });

    it('emits value when submitted', () => {
      const spy = spyOn(component.valueChange, 'emit').and.callThrough();

      submitButton.nativeElement.click();

      fixture.detectChanges();

      expect(spy.calls.count()).toBe(1);
      expect(spy.calls.first().args).toEqual([{
        number: 654765,
        holder: {
          name: 'Lukasz Prus',
          age: 40,
          gender: 'male'
        }
      }]);
    });
  });

  describe('when filled out incorrectly', () => {
    beforeEach(() => {
      setValue(numberInput, '321321321');
      setValue(holderAgeInput, '10');

      fixture.detectChanges();
    });

    it('shows correct field validation errors and erroneous state', () => {
      expect(errors(number).length).toBe(0);
      expect(errors(holderName).length).toBe(0);
      expect(errors(holderAge).length).toBe(1);
      expect(errors(holderGender).length).toBe(0);

      expect(holderAge.nativeElement.textContent).toContain('Number must be minimum 20');

      expect('is-valid' in numberInput.classes).toBe(true);
      expect('is-invalid' in numberInput.classes).toBe(false);

      expect('is-valid' in holderNameInput.classes).toBe(false);
      expect('is-invalid' in holderNameInput.classes).toBe(false);

      expect('is-valid' in holderAgeInput.classes).toBe(false);
      expect('is-invalid' in holderAgeInput.classes).toBe(true);

      expect('is-valid' in holderGenderInputWrapper.classes).toBe(false);
      expect('is-invalid' in holderGenderInputWrapper.classes).toBe(false);
    });

    it('does not emit when submitted', () => {
      const spy = spyOn(component.valueChange, 'emit').and.callThrough();

      submitButton.nativeElement.click();

      fixture.detectChanges();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});

@Component({
  template: '<app-policy-add-edit-form label="Update" [(value)]="policy"></app-policy-add-edit-form>'
})
class TestHostComponent {
  policy: Policy | null | undefined;
}

describe('PolicyAddEditFormComponent in a host component', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHostComponent: TestHostComponent;
  let number: DebugElement,
    holderName: DebugElement,
    holderAge: DebugElement,
    holderGender: DebugElement,
    numberInput: DebugElement,
    holderNameInput: DebugElement,
    holderAgeInput: DebugElement,
    holderGenderInputWrapper: DebugElement,
    submitButton: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TestHostComponent, PolicyAddEditFormComponent]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = fixture.componentInstance;

    fixture.detectChanges();

    const testElement = (name: string) => fixture.debugElement.query(By.css(`[data-test-${name}]`));
    const input = (debugElement: DebugElement) => debugElement.query(By.css('input'));

    number = testElement('number');
    holderName = testElement('holderName');
    holderAge = testElement('holderAge');
    holderGender = testElement('holderGender');

    numberInput = input(number);
    holderNameInput = input(holderName);
    holderAgeInput = input(holderAge);
    holderGenderInputWrapper = holderGender.query(By.css('[data-test-holderGenderInputWrapper]'));

    submitButton = fixture.debugElement.query(By.css(`[type="submit"]`));
  });

  it("updates form when 'value' input changes", () => {
    expect(holderNameInput.nativeElement.value).toBe('');

    testHostComponent.policy = {
      number: 654765,
      holder: {
        name: 'Lukasz Prus',
        age: 40,
        gender: 'male'
      }
    };
    fixture.detectChanges();

    expect(holderNameInput.nativeElement.value).toBe('Lukasz Prus');

    testHostComponent.policy = null;
    fixture.detectChanges();

    expect(holderNameInput.nativeElement.value).toBe('');
  });

  it('emits form value on submit', () => {
    expect(testHostComponent.policy).toBeUndefined();

    setValue(numberInput, '654765');
    setValue(holderNameInput, 'Lukasz Prus');
    setValue(holderAgeInput, '40');

    const male = holderGenderInputWrapper.query(By.css('input')).nativeElement;

    male.click();
    male.dispatchEvent(new Event('blur'));

    submitButton.nativeElement.click();

    fixture.detectChanges();

    expect(testHostComponent.policy).toEqual({
      number: 654765,
      holder: {
        name: 'Lukasz Prus',
        age: 40,
        gender: 'male'
      }
    });

    setValue(holderAgeInput, '77');

    submitButton.nativeElement.click();

    fixture.detectChanges();

    expect(testHostComponent.policy).toEqual({
      number: 654765,
      holder: {
        name: 'Lukasz Prus',
        age: 77,
        gender: 'male'
      }
    });
  });
});
