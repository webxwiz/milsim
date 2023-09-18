import { eventPage } from "@/metadata/metadata";
import Event from "./Event";
import { EventProps } from "./interface";

export const metadata = eventPage

export default function EventPage(props: EventProps) {
    return <Event props={props} />
}