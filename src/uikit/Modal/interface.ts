export interface ModalProps {
    isOpen: boolean
    onClose: () => void
    mode?: 'platoon' | 'squad' | 'role'
    isEdit?: boolean
    onSubmit?: () => void
}