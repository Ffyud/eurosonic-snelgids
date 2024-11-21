import { Country } from "./country.enum";
import { Day } from "./day.enum";
import { Location } from "./location.enum";

export interface Gig {
    artist: string,
    description: string,
    country: Country,
    location: Location,
    day: Day,
    time?: string,
    rating: string,
    favorite?: boolean

}