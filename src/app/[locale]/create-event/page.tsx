import { EventForm } from "@/components/EventForm";
import { createEvent } from "@/metadata/metadata";

const metadata = createEvent

export default function CreateEvent() {
    return <EventForm />
}