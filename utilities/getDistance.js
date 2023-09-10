const R = 6371 // Radius of the earth in km

const getDistanceFromLatLonInMiles = async (lat1, lon1, lat2, lon2) => {
    let dLat = deg2rad(lat1 - lat2)
    let dLon = deg2rad(lon1 - lon2)
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    let d = R * c //km
    let m = d * 0.621371 //miles
    return m
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

export {getDistanceFromLatLonInMiles}
