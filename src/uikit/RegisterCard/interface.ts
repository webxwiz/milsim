export interface RegisterCardProps {
    title: string
    data: Data[]
    isEdit?: boolean
}

interface Data {
    id: string | number
    title: string
    isEdit?: boolean
}