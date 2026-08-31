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



// degrees
//   ↓
// toRad()
//   ↓
// radians
//   ↓
// Math.sin / Math.cos    these two methods works on radian not degree but we first get the dference in degree so we need to get radian  

function toRad(deg: number): number {
    return deg * (Math.PI / 180);
}
// this func will convert degree into radians.

// build google map navigation link from coords
export function buildNavLink(lat: number, lon: number, label?: string): string {
    const dest = `${lat},${lon}`;
    const base = "https://ww.google.com/maps/dir/?api=1";
    return label ? `${base}&destination=${dest}&destination_place_id=${encodeURIComponent(label)}`
        : `${base}&destination=${dest}`;
}

buildNavLink(34.545, 87.966);  //  because the third parameter is optional.
// 34.545,87.966   get this attached with base variables. which holds url
