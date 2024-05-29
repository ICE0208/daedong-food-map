function formatDistance(meters: number): string {
  if (meters >= 1000) {
    const kilometers = meters / 1000;
    return `${kilometers.toFixed(1)} km`;
  } else {
    return `${meters} m`;
  }
}

export default formatDistance;
