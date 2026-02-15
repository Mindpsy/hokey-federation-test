import { z } from 'zod'
import { LOCALE } from '../environment'
import { isValueOfEnum } from '../ts'

type Migration = (state: Record<string, unknown>) => void

export enum STORAGE_KEY {
  /** Токен сессии */
  accessToken = 'GSM2-accessToken',

  /** Токен для продления сессии */
  refreshToken = 'GSM2-refreshToken',

  /**
   * Id организации учетной записи
   * userId -> organizationId
   */
  organizationId = 'GSM2-organizationId',

  /** Язык интерфейса */
  locale = 'GSM2-locale',

  /**
   * Проекция проекта
   * projectId -> projectionId
   */
  activeProjection = 'GSM2-activeProjection',

  /**
   * Базовый слой сцены
   * sceneId -> baseLayerId
   */
  baseLayer = 'GSM2-baseLayer',

  /** Настройки сцены */
  scene3dSettings = 'GSM2-sceneSettings',
}

export const StorageSchema = z.object({
  /** Токен сессии */
  [STORAGE_KEY.accessToken]: z.string().optional(),

  /** Токен для продления сессии */
  [STORAGE_KEY.refreshToken]: z.string().optional(),

  /**
   * Id организации учетной записи
   * userId -> organizationId
   */
  [STORAGE_KEY.organizationId]: z.record(z.string()).optional(),

  /** Язык интерфейса */
  [STORAGE_KEY.locale]: z.nativeEnum(LOCALE).optional(),

  /**
   * Проекция проекта
   * sceneId -> projectionId
   */
  [STORAGE_KEY.activeProjection]: z.record(z.string()).optional(),

  /**
   * Базовый слой для сцены проекта
   * projectId -> baseLayerId
   */
  [STORAGE_KEY.baseLayer]: z.record(z.string()).optional(),

  /** Настройки сцены */
  [STORAGE_KEY.scene3dSettings]: z.record(z.string()).optional(),
})
type IStorageModel = z.infer<typeof StorageSchema>

export class Storage {
  private static readonly LAST_APPLIED_MIGRATION_TIME_KEY = '__GSM2-lastAppliedMigrationTime'

  constructor() {
    const state = this.readState()
    this.migrateState(state).then((res) => {
      this.validateState(res)
    })
  }

  public get<T extends STORAGE_KEY>(key: T): IStorageModel[T] {
    if (!isValueOfEnum(STORAGE_KEY, key)) {
      throw new Error(`Неверный ключ хранилища: ${key}`)
    }

    const value = (() => {
      const data = localStorage.getItem(key)
      if (!data)
        return

      if (Number.isFinite(data))
        return Number(data)

      try {
        return JSON.parse(data)
      }
      catch {
        return data
      }
    })()

    if (!StorageSchema.shape[key].safeParse(value).success) {
      console.warn('Неверное значение в хранилище', key, value)
      return
    }

    return value as IStorageModel[typeof key]
  }

  public set<T extends STORAGE_KEY>(key: T, value: IStorageModel[T]): void {
    if (!isValueOfEnum(STORAGE_KEY, key)) {
      throw new Error(`Неверный ключ хранилища: ${key}`)
    }

    if (!StorageSchema.shape[key].safeParse(value).success) {
      throw new Error(`Неверное значение для ключа ${key}: ${value}`)
    }

    if (!value)
      localStorage.removeItem(key)
    else if (typeof value === 'number' || typeof value === 'string')
      localStorage.setItem(key, value.toString())
    else
      localStorage.setItem(key, JSON.stringify(value))
  }

  public remove(key: STORAGE_KEY) {
    if (!isValueOfEnum(STORAGE_KEY, key))
      throw new Error(`Неверный ключ хранилища: ${key}`)

    localStorage.removeItem(key)
  }

  public clear(): void {
    const state = this.readState()
    Object.keys(state).forEach((key) => {
      localStorage.removeItem(key)
    })
  }

  private readState(): Record<string, unknown> {
    const state: Record<string, unknown> = {}

    let key: string | null
    let iteration = 0
    do {
      key = localStorage.key(iteration++)
      if (!key || !isValueOfEnum(STORAGE_KEY, key))
        continue

      const value = localStorage.getItem(key)
      if (!value)
        continue

      if (Number.isFinite(value)) {
        state[key] = Number(value)
      }
      else {
        try {
          state[key] = JSON.parse(value)
        }
        catch {
          state[key] = value
        }
      }
    } while (key)

    return state
  }

  private readMigrations(): Array<{ time: number, execute: () => Promise<Migration> }> {
    const lastAppliedMigrationTime = (() => {
      const data = localStorage.getItem(Storage.LAST_APPLIED_MIGRATION_TIME_KEY)
      return data && Number.isFinite(data)
        ? +data
        : null
    })()
    const modulesDict = import.meta.glob<Migration>(`./migrations/*.ts`, { import: 'default' })
    return Object.values(modulesDict)
      .map((migration) => {
        const match = migration.name.match(/\/(\d+)-.*\.ts$/)
        if (!match?.[1]) {
          console.warn(`Не удалось определить время миграции для ${migration.name}. Пропускаем`)
          return null
        }

        const migrationTime = +match[1]
        return {
          time: +migrationTime,
          execute: migration,
        }
      })
      .filter(Boolean)
      .filter(({ time }) => {
        return !lastAppliedMigrationTime || time > lastAppliedMigrationTime
      })
  }

  private async migrateState(state: Record<string, unknown>): Promise<Record<string, unknown>> {
    state = { ...state }
    const migrations = this.readMigrations()
    for (const migration of migrations) {
      const migrationFunction = await migration.execute()
      migrationFunction(state)
      localStorage.setItem(Storage.LAST_APPLIED_MIGRATION_TIME_KEY, migration.time.toString())
    }
    for (const [key, value] of Object.entries(state)) {
      if (isValueOfEnum(STORAGE_KEY, key))
        // eslint-disable-next-line ts/ban-ts-comment
        // @ts-expect-error
        this.set(key, value)
    }
    return state
  }

  private validateState(state: Record<string, unknown>): IStorageModel {
    state = { ...state }
    Object.entries(state).forEach(([key, value]) => {
      if (!isValueOfEnum(STORAGE_KEY, key))
        return

      if (!StorageSchema.shape[key].safeParse(value).success) {
        console.warn('Неверное значение в хранилище', key, value)
        delete state[key]
      }
    })

    return state as IStorageModel
  }
}

export const storage = new Storage()

if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    const newStorage = newModule?.storage
    if (newStorage instanceof Storage) {
      Object.assign(storage, newStorage)
    }
    else {
      console.warn('Новый модуль storage не является экземпляром Storage')
    }
  })
}
