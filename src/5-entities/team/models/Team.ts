import { TeamDTO } from "./Team.dto"

export class Team {
    id: string
    name: string
    city: string
    points: string

    constructor(dto: TeamDTO) {
        this.id = dto.id
        this.name = dto.name
        this.city = dto.city
        this.points = dto.points
    }

    toDTO() {
        return {
            id: this.id,
            name: this.name,
            city: this.city,
            points: this.points,
        }
    }
}