import { RoleType, RolesType, SquadType } from "@/components/EventForm/interface"

export interface RegisterCardProps {
    title: string
    data: SquadType[] | RoleType[]
    isEdit?: boolean
    onEdit?: () => void
    isSelect?: boolean
    addSquad?: () => void
    changePlatoon?: (platoonId: string, image: string, color: string, title: string) => void
    handleRole?: (id: string, role: RoleType, name: string, isRemove: boolean) => void
    squadId?: string
    busyRoles?: RolesType[]
    removeSquad?: (platoonId: string, squadId: string) => void
    removePlatoon?: (id: string) => void
    onChangeName?: (id: string, squadId: string, name: string) => void
    onChangeNameRole?: (id: string, squadId: string, roleId: string, value: string, type: string) => void
    removeSquadRole?: (id: string, squadId: string, roleId: string) => void
    platoonId?: string
    indexId?: number
    image?: string
    color?: string
}