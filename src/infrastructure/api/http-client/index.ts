import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

import { errorService } from '@/application/services/error'

class HttpClient {
  private static instance: AxiosInstance
  
  private static API_BASE_URL = 'http://localhost:8000'

  private constructor() {}

  public static getInstance(): AxiosInstance {
    if (!HttpClient.instance) {
      HttpClient.instance = axios.create({
        baseURL: this.API_BASE_URL,
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      })

      HttpClient.instance.interceptors.response.use(
        (response: AxiosResponse): AxiosResponse => response,
        (error: AxiosError): Promise<AxiosError> => {
          throw errorService.generateInfrastructureError('Api', error, error.message)
        }
      )

    }

    return HttpClient.instance
  }
}

export default HttpClient
