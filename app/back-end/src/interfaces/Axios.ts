export interface IAxiosResponse {
  data: any
  status: number
  statusText: string
  headers: Record<string, string>
  config: unknown
  request: unknown
}

export interface IAxiosRequestConfig {
  baseURL?: string
  headers?: Record<string, string>
  adapters?: ((data: any) => any)[]
  transformResponse?: ((data: any) => any)[]
  timeout?: number
  retries?: number
}

export interface IAxios {
  get(URL?: string, config?: IAxiosRequestConfig): Promise<IAxiosResponse>
  post(URL: string, payload: any, config?: IAxiosRequestConfig): Promise<IAxiosResponse>
  put(URL: string, payload: any, headers?: Record<string, string>): Promise<IAxiosResponse>
  delete(URL: string, payload: any, headers?: Record<string, string>): Promise<IAxiosResponse>
}