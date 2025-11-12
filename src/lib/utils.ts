/**
 * Calculate circular position for an item in a ring
 * @param index - Index of the item
 * @param total - Total number of items
 * @param radius - Radius of the circle in pixels
 * @returns {x, y} coordinates relative to center
 */
export function getCircularPosition(
  index: number,
  total: number,
  radius: number
): { x: number; y: number } {
  // Start from the top (0 degrees = -90 degrees in standard coordinates)
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius
  }
}

/**
 * Calculate stagger delay for sequential animations
 * @param index - Index of the item
 * @param delayIncrement - Time delay between each item in seconds
 * @returns Total delay time in seconds
 */
export function getStaggerDelay(index: number, delayIncrement: number): number {
  return index * delayIncrement
}
