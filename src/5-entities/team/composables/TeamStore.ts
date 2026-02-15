import { acceptHMRUpdate, defineStore } from 'pinia'
import { Cities } from '~entities/city'
import { Team } from '~entities/team'
import { TeamService } from '~entities/team'

export const useTeam = defineStore('team', () => {
    const teamService = new TeamService()
    const teams: Ref<Array<Team>> = ref([])
    const mockTeams: Array<Team> = [
        new Team({
            id: '1',
            name: 'Team Alpha',
            city: Cities.Moscow.toString(),
            points: 100,
        }),
        new Team({
            id: '2',
            name: 'Team Beta',
            city: Cities.SaintPetersburg.toString(),
            points: 80,
        }),
        new Team({
            id: '3',
            name: 'Team Gamma',
            city: Cities.Kazan.toString(),
            points: 60,
        }),
    ]

    async function getTeams() {
        return mockTeams
        return teams.value = await teamService.getTeamsList()
    }

    return {
        teams,
        
        getTeams
    }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTeam, import.meta.hot))