import { ApiService } from '~shared/api'
import { Team } from '~entities/team'
import { TeamDTO } from '~entities/team'

export class TeamService extends ApiService {

    constructor() {
        super({ apiURL: import.meta.env.ENV_PROJECT_SERVER_URL })
    }

    async getTeamsList( skip = 0, limit = 12, query = '') {
        return this.fetch('/teams', {
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