export interface ButtonProps {
    title: string
    onClick?: () => void
    children?: React.ReactNode
    isCancel?: boolean
}