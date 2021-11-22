import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { currencyType } from 'src/app/core/models/currency-type.model';
import { Currency } from 'src/app/core/models/currency.model';
import { CurrencyService } from 'src/app/core/services/module-services/currency/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit, OnDestroy {

  public currencyForm: FormGroup;
  public currencyTypeList = currencyType;
  public loading = false;
  private currencyEventHandlerSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private currencyService: CurrencyService) {
  }

  ngOnInit() {
    this.createCurrencyForm();
  }

  private createCurrencyForm() {
    this.currencyForm = this.fb.group({
      baseCurrency: [null, [Validators.required]],
      quoteCurrency: [null, [Validators.required]],
      baseAmount: [null, [Validators.required]],
      conversionRate: { value: null, disabled: true },
      expectedAmount: { value: null, disabled: true },
    });
  }

  get currencyFormValue(): Currency {
    return this.currencyForm.value;
  }

  public checkRequiredValidation(formControl: string) {
    return this.currencyForm.get(formControl) && this.currencyForm.get(formControl).errors &&
      this.currencyForm.get(formControl).hasError('required') && this.currencyForm.get(formControl).touched;
  }

  public isResultExist() {
    return this.currencyForm.getRawValue().conversionRate !== null && this.currencyForm.getRawValue().expectedAmount !== null;
  }

  public checkCurrencyTypesValidation() {
    const isValid = this.currencyForm.get('baseCurrency').value !== this.currencyForm.get('quoteCurrency').value;
    
    if (!isValid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Operation Failed',
        detail: 'Base Currency and Quote Currency cannot be same.',
      });
    }

    return isValid;
  }


  public onSubmit() {
    if (!this.checkCurrencyTypesValidation() || !this.currencyForm.valid) {
      this.currencyForm.markAllAsTouched();
    } else {
      this.loading = true;

      const formData = {
        baseCurrency: this.currencyFormValue.baseCurrency,
        quoteCurrency: this.currencyFormValue.quoteCurrency,
        baseAmount: Math.round(Number(this.currencyFormValue.baseAmount) / 100),
      }

      this.currencyEventHandlerSubscription = this.currencyService.getCurrency(formData).subscribe(
        (res: any) => {
          this.currencyForm.patchValue({
            conversionRate: res.body.quoteRate,
            expectedAmount: res.body.exchangeAmount
          });

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Process Completed',
          });
        },
      ).add(() => {
        this.loading = false;
      });
    }
  }

  ngOnDestroy() {
    this.currencyEventHandlerSubscription.unsubscribe()
  }
}
