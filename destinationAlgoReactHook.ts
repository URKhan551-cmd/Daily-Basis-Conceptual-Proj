this Hook combines React state + async API calls + Promise.allSettled() + TypeScript + your destination scoring algorithm.

  that is the flow of useWeather.ts hook 
useWeather() hook does something like:

User searches "Dubai"
        ↓
apiResponse("Dubai")
        ↓
Weather data
        ↓
Display Dubai weather


but useDestination.ts hook is quite different
"Which of my predefined destinations has the best weather right now?"

For example, your DESTINATIONS might contain:

Dubai
Abu Dhabi
Sharjah
Fujairah
Ras Al Khaimah
Muscat
Doha
Riyadh
...


  useState
To store changing data:

results
loading
fetched


useCallback

To memoize your functions:

fetchDestination
fetchComparison

This means React doesn't unnecessarily create a brand-new function every render.


apiResponse(city)

which eventually does:

city
 ↓
Visual Crossing API
 ↓
WeatherApiResponse


This describes one destination's complete weather + scoring information.

For example, after fetching Dubai, one object might look conceptually like:


{
    dest: {
        id: "dubai",
        name: "Dubai",
        city: "Dubai",
        ...
    },

    temp: 34,
    feelsLike: 38,
    conditions: "Clear",

    icon: "clear-day",

    humidity: 60,
    windSpeed: 15,
    uvIndex: 8,
    precipProb: 5,
score: {
        id: "dubai",
        score: 82,
        reasons: [...],
        warnings: [...]
    },

    loading: false,
    error: null
}
      this is essential VIEW MODEL

  So DestinationWeather is essentially your view-model.

It takes raw API information and turns it into something your UI can directly consume.


import {useState, useCallback} from "react";
import {apiResponse} from "../Api/apiResponse.ts";
import {
    DESTINATIONS,
    scoreDestination,
    type Destination,
    type DestinationScore,
    type DestinationType,
} from "../utils/destinations.ts";

// after fetching what we are going to store in destination
export interface DestinationWeather {
    dest: Destination;
    temp: number;
    feelsLike: number;
    conditions: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    uvIndex: number;
    precipProb: number;
    score: DestinationScore;
    loading: boolean;
    error: string | null;
}

export function useDestinations(){
    const [results, setResults] = useState<DestinationWeather[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [fetched, setFetched] = useState<boolean>(false);

    // fetch weather for filtered set of destination in parallel
  // here the destination type is UNION maybe "all" or the provided type one retrieve 
    const fetchDestination = useCallback( async (type: DestinationType | "all" = "all") => {
         const targets = type === "all" ? DESTINATION : DESTINATIONS.filter((d) => d.type === type);

         setLoading(true);
         setFetched(false);

         //build placeholder rows immediately so UI shows loading states
         const placeholders: DestinationWeather[] = targets.map((dest) => ({
            dest,
            temp: 0, feelsLike: 0, conditions: "", icon: "",
            humidity: 0, windSpeed: 0, uvIndex: 0, precipProb: 0,
            score: {id: dest.id, score: 0, reasons: [], warnings: []},
            loading: true,
            error: null,

         }));

         setResults(placeholders);


        //  fetchAll in parallel - Promise.allSettled so one failure does not kill all fetch data
        const settled = await Promise.allSettled(
            targets.map(dest => apiResponse(dest.city))
        );

        const final: DestinationWeather[] = targets.map((dest, i) => {
            const result = settled[i];

            if(result.status === "rejected"){
                return {
                    ...placeholders[i],
                    loading: false,
                    error: "Failed to load",
                };
            }

            const d = result.value;
            const cc = d.currentConditions as {
                temp: number; feelslike: number; conditions: string; icon: string;
                humidity: number; windspeed: number; uvindex: number; precipprob: number;
            };

            const score = scoreDestination(
                dest,
                cc.temp,
                cc.uvindex,
                cc.windspeed,
                cc.precipprob,
            );
            
            return {
                dest,
                temp: cc.temp,
                feelsLike: cc.feelslike,
                conditions: cc.conditions,
                icon: cc.icon,
                humidity: cc.humidity,
                windSpeed: cc.windspeed,
                uvIndex: cc.uvindex,
                precipProb: cc.precipprob,
                score,
                loading: false,
                error: null,
            };
        });

        // sort by score descending - best first which has high score
        final.sort((a, b) => b.score.score - a.score.score);
        setResults(final);
        setLoading(false);
        setFetched(true); 
    }, []);

   
