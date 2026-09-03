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


