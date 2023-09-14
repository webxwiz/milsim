import { SquadType } from "@/components/EventForm/interface"

export interface ModalProps {
    isOpen: boolean
    onClose: () => void
    mode?: 'platoon' | 'squad' | 'role'
    isEdit?: boolean
    onSubmit?: any

    itemId?: string | number,
    squadId?: string | number,
    watchData?: SquadType
}