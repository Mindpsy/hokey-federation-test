import type { REDIRECT_REASON } from '../lib/router'

export class ApplicationError extends Error {
  constructor(message: string, public readonly options?: { data?: string | number }) {
    super(message)
    this.name = 'ApplicationError'
  }
}

export class AuthError extends Error {
  constructor(
    message: string = 'Unauthorized',
    public readonly reason?: REDIRECT_REASON,
  ) {
    super(message)
    this.name = 'AuthError'
  }
}

export class ConnectionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ConnectionError'
  }
}

export class BadRequestError extends Error {
  constructor(
    message: string = 'Некорректный запрос',
  ) {
    super(message)
    this.name = 'BadRequestError'
  }
}

export class UnexpectedError extends Error {
  constructor(message: string, public log?: unknown) {
    super(`Непредвиденная ошибка. ${message}`)
    this.name = 'UnexpectedError'
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(`Не найдено. ${message}`)
    this.name = 'NotFoundError'
  }
}

export class ForbiddenError extends Error {
  constructor(message: string) {
    super(`Недостаточно прав. ${message}`)
    this.name = 'ForbiddenError'
  }
}

export class ValidationError extends Error {
  constructor(message: string, public readonly data?: Record<string, string | string[] | undefined>) {
    super(`Ошибка валидации. ${message}`)
    this.name = 'ValidationError'
  }
}

export class ConflictError extends ApplicationError {
  constructor(
    message: string = 'Обнаружен конфликт версий',
    public readonly data?: {
      code?: string
    },
  ) {
    super(message, { data: JSON.stringify(data) })
    this.name = 'ConflictError'
  }
}
