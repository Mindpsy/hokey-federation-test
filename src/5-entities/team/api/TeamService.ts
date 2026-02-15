import { ApiService } from '~shared/api'
import { Team } from '~entities/team'
import { TeamDTO } from '~entities/team'

export interface GetTeamsListParams {
  skip?: number
  limit?: number
  query?: string
}

export interface GetTeamsListResponse {
  projects: TeamDTO[]
}

export class TeamService extends ApiService {

    constructor() {
        super({ apiURL: import.meta.env.ENV_PROJECT_SERVER_URL })
    }

    async getTeamsList(skip: number = 0, limit: number = 12, query: string = ''): Promise<Team[]> {
        return this.fetch<GetTeamsListResponse>('/teams', {
            method: 'GET',
            query: {
                skip,
                limit,
                query,
            },
        }).then((dtos) => {
            return [...dtos.projects.map((dto: TeamDTO) => new Team(dto)) ]
        })
    }
}