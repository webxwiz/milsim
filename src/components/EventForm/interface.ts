export interface EventFormProps {
    isEdit?: boolean
    id?: string | number
}

export interface EventFormTypes {
    id: string | number
    eventName: string
    eventDate: string
    eventDuration: string
    eventImage: string
    eventDescription: string
    eventPlatoons: PlatoonType[]
}

export interface PlatoonType {
    _id: string
    name: string
    color: string
    image: string
    squads: SquadType[]
}

export interface SquadType {
    _id: string
    name: string
    roles: RoleType[]

    busyRoles?: RolesType[]
    waitingList?: RolesType[]
    enlisted?: RolesType[]
}

export interface RoleType {
    _id: string | number
    name: string
    count: number | string
}

export interface RolesType {
    _id: string | number
    discordId: String
    name: string
    role: String
  }