// import type { RouteLocationRaw } from 'vue-router'

export enum REDIRECT_REASON {
  tokenExpired = 1,
}

export const ROUTE = {
    home: { path: '/'},
    teamsList: { path: 'teams-list'},
    html: { path: 'html-page.html', isNative: true },
    generic: { path: 'generic' },
}

export interface IRoute {
  path: string
  isNative?: boolean
}