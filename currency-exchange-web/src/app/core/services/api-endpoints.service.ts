import { Injectable } from '@angular/core';
import { UrlBuilder } from '../../shared/classes/url-builder';
import { QueryStringParameters } from '../../shared/classes/query-string-parameters';

@Injectable()
export class ApiEndpointsService {
  constructor() { }

  public createUrlWithQueryParameters(
    action: string,
    api: string,
    queryStringHandler?: (queryStringParameters: QueryStringParameters) => void, // Create string with parameters
    options?: any
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(api, action);

    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);  // Create final url
    }

    return urlBuilder.toString();
  }
}
