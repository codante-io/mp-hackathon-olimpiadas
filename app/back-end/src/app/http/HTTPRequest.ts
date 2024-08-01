import axios, { AxiosRequestConfig } from 'axios'

import {
  IAxios,
  IAxiosResponse,
  IAxiosRequestConfig,
} from '../../interfaces'

export class HTTPRequest {
  readonly instance: IAxios
  readonly context: AxiosRequestConfig

  constructor(baseURL: string, headers?: any, options?: AxiosRequestConfig) {
    this.context = {
      baseURL,
      timeout: process.env.REQUEST_TIMEOUT ? +process.env.REQUEST_TIMEOUT : 30000,
      headers,
      ...options,
    }

    this.instance = axios.create(this.context)
  }

  async get(URL: string, params?: IAxiosRequestConfig): Promise<IAxiosResponse> {
    return this.instance.get(URL, {
      headers: { 'Connection': 'keep-alive', ...params?.headers },
      // Allows changes to the response data to be made before
      // it is passed to then/catch
      transformResponse: params?.adapters,
      timeout: params?.timeout,
    })
  }

  async post(URL: string, payload: any, params?: IAxiosRequestConfig): Promise<IAxiosResponse> {
    return this.instance.post(
      URL,
      payload,
      {
        headers: params?.headers,
        transformResponse: params?.adapters,
        timeout: params?.timeout,
      },
    )
  }
}