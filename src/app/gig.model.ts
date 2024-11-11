import { Day } from "./day.enum";
import { Location } from "./location.enum";

export interface Gig {
    artist: string,
    description: string,
    origin?: string,
    location: Location,
    day: Day,
    time?: string,
    rating: string,
}