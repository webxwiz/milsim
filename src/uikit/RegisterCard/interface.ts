import { RoleType, RolesType, SquadType } from "@/components/EventForm/interface"

export interface RegisterCardProps {
    title: string
    data: SquadType[] | RoleType[]
    isEdit?: boolean
    onEdit?: () => void
    isSelect?: boolean
    addSquad?: () => void
    handleRole?: (id: string, role: RoleType, name: string, isRemove: boolean) => void
    squadId?: string
    busyRoles?: RolesType[]
    removeSquad?: () => void
    removePlatoon?: () => void
    onChangeName?: () => void
    onChangeNameRole?: () => void
    platoonId?: string
}