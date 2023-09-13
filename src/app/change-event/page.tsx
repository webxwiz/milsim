'use client'
import { EventForm } from "@/components/EventForm";
import { useRouter } from "next/navigation";
import { ChangeEventProps } from "./interface";

export default function ChangeEvent(props: ChangeEventProps) {
    const router = useRouter()

    console.log('event id for chaange event page', props)

    return <EventForm isEdit />
}