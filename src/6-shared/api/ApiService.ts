import { Api, ApiOptions } from './Api'
import { AxiosError, AxiosInstance } from 'axios'
import axios from 'axios'
import { $fetch } from 'ofetch'
import { BadRequestError, ConflictError, ForbiddenError, NotFoundError, UnexpectedError, ValidationError, AuthError, ConnectionError } from '../lib/error'
import { AXIOS_ERROR_CODES } from '~shared/config'

export class ApiService extends Api {
  fetch: typeof $fetch
  axios?: AxiosInstance

  constructor(options: ApiOptions & { useAxios?: boolean, axiosThrowsError?: { network?: boolean } }) {
    super(options)

    const defaults = {
      baseURL: `${this.baseURL}${this.controller}`,
    }

    this.fetch = $fetch.create({
      ...defaults,
      onRequest: async ({ options }) => {
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        if (!options.skipHeaders) {
          options.headers = {
            ...options.headers,
            ...this.getHeaders(),
          }
        }
      },
      onResponseError: (context) => {
        const status = context.response.status
        const responseData = context.response._data || {}

        switch (status) {
          case 400:
            throw new BadRequestError('Некорректный запрос')

          case 401:
            throw new AuthError('Необходима авторизация')

          case 403:
            throw new ForbiddenError('Нет доступа к ресурсу')

          case 404:
            throw new NotFoundError('Ресурс не найден')

          case 409:
            throw new ConflictError(
              responseData.message,
              {
                code: responseData.code,
              },
            )

          case 422:
            throw new ValidationError('Конфликт данных', responseData)

          case 500:
            if (Array.isArray(responseData.message)) {
              throw new ValidationError('Конфликт данных', { errors: responseData.message })
            }
            throw new UnexpectedError('Произошла непредвиденная ошибка')

          default:
            throw new UnexpectedError('Произошла непредвиденная ошибка')
        }
      },
      onRequestError: () => {
        throw new ConnectionError('Ошибка соединения')
        // if (context.response.status === 401)
        // logOut
      },
    })

    if (options.useAxios) {
      const defaultTransformers = (() => {
        const data = axios.defaults.transformRequest
        return (data && (Array.isArray(data) ? data : [data])) || []
      })()
      this.axios = axios.create({
        ...defaults,
        withCredentials: true,
        transformRequest: [(data, headers) => {
          Object.assign(headers, this.getHeaders())

          return data
        }, ...defaultTransformers],
      })
      this.axios.interceptors.response.use(r => r, (err: AxiosError) => {
        if (options.axiosThrowsError?.network && err.code === AXIOS_ERROR_CODES.network)
          throw new ConnectionError('Ошибка соединения')

        if (err.request.status === 401)
            console.log('Unauthorized')

          return Promise.reject(err)
      })
    }
  }
}