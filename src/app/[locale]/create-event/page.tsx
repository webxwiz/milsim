import { EventForm } from "@/components/EventForm";
import { createEvent } from "@/metadata/metadata";

export const metadata = createEvent

export default function CreateEvent() {
    return <EventForm />
}