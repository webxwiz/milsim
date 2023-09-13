export interface EventFormProps {
    isEdit?: boolean
}

export interface EventFormTypes {
    id: string
    eventName: string
    eventDate: string
    eventDuration: string
    eventImage: string
    eventDescription: string
    eventPlatoons: PlatoonType[]
}

export interface PlatoonType {
    id: string
    name: string
    color: string
    image: string
    squads: SquadType[]
}

export interface SquadType {
    id: string
    name: string
    roles: RoleType[]

    busyRoles: RolesType[]
    waitingList: RolesType[]
    enlisted: RolesType[]
}

export interface RoleType {
    id: string
    name: string
    count: number
}

export interface RolesType {
    id: string
    discordId: String
    role: String
  }