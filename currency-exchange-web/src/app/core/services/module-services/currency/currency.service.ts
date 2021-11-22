import { Injectable } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { QueryStringParameters } from 'src/app/shared/classes/query-string-parameters';
import { ApiEndpointsService } from '../../api-endpoints.service';
import { ApiHttpService } from '../../api-http.service';

@Injectable({ providedIn: 'root' })
export class CurrencyService {
  constructor(
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService,
    private constants: Constants
  ) { }

  public getCurrency<T>(formRef?: any) {
    let url = '';
    const filter: any = {};

    if (formRef) {
      for (const formControl in formRef) {
        if (formRef[formControl] !== null && formRef[formControl] !== '') {
          filter[formControl] = formRef[formControl];
        }
      }


      // Create url string with form control values
      url =
        this.apiEndpointsService.createUrlWithQueryParameters(
          'currency',
          this.constants.API_ENDPOINT,
          (qs: QueryStringParameters) => {
            for (const param in filter) {
              qs.push(param, filter[param]);
            }
          }
        );

      return this.apiHttpService.get<T>(url);
    }

    throw new Error(`Request error`);
  }
}
