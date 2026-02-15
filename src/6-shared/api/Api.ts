
export interface ApiOptions {
  apiURL: string
  controller?: string
}

export interface ApiHeaders {
  [key: string]: string
}

export class Api {
  public readonly apiURL: string
  public readonly baseURL: string
  public readonly controller: string

  constructor(options: ApiOptions) {
    this.apiURL = options.apiURL
    this.baseURL = this.apiURL
    this.controller = options.controller ?? ''
  }

  public getHeaders(): ApiHeaders {
    return {
    //   'Authorization': `Bearer ${storage.get(STORAGE_KEY.accessToken)}`,
    //   'Accept-Language': storage.get(STORAGE_KEY.locale) ?? readBrowserLocale(),
    }
  }
}
