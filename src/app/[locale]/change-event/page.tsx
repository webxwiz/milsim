'use client'
import { EventForm } from "@/components/EventForm";
import { useRouter } from "next/navigation";
import { ChangeEventProps } from "./interface";

export default function ChangeEvent(props: ChangeEventProps) {
    const router = useRouter()

    const eventId = props?.searchParams?.id

    return <EventForm isEdit id={eventId} />
}