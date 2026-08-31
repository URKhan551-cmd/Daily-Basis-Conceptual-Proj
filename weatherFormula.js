// here we will mostly do some physics works 
// formulas like HAVERSINE which is used to calc distance between two points in KM
// Haversine formula
export function calcDistance(lat1: number, lat2: number, lon1: number, lon2: number): number {
    const radius = 6371; // earth ka radius
    const diameterLat = toRad(lat2 - lat1);
    const diameterLon = toRad(lon2 - lon1);
    const a = Math.sin(diameterLat / 2) * Math.sin(diameterLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(diameterLon / 2) * Math.sin(diameterLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(radius * c);

}

