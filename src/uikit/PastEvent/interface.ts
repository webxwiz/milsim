export interface PastEventProps {
    id: string | number
    title: string
    date: string
    url: string
    isEdit?: boolean
    eventDelete?: (id: number | string) => void
}