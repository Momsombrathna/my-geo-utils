function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Calculates distance and estimated time between two coordinates.
 * @param {number} lat1 - Latitude of start point.
 * @param {number} lon1 - Longitude of start point.
 * @param {number} lat2 - Latitude of end point.
 * @param {number} lon2 - Longitude of end point.
 * @param {number} averageSpeedKmH - Optional. Average speed in km/h (default 60).
 * @returns {object} - Distance and estimated time.
 */

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function getTravelEstimate(lat1, lon1, lat2, lon2, averageSpeedKmH = 60) {
  const R = 6371; // Earth radius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  const timeInHours = distance / averageSpeedKmH;
  const hours = Math.floor(timeInHours);
  const minutes = Math.round((timeInHours - hours) * 60);

  return {
    distanceKm: distance.toFixed(2),
    estimatedTime: `${hours}h ${minutes}m`,
    averageSpeed: averageSpeedKmH,
  };
}

module.exports = { getTravelEstimate, getDistance };
