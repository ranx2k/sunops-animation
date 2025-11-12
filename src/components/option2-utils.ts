/**
 * Utilities for Option 2: 3D Sphere animation
 */

/**
 * Calculate spherical position for distributing points on the FRONT hemisphere only
 * Points are positioned facing the camera (positive Z direction)
 * @param index - Index of the point
 * @param total - Total number of points
 * @param radius - Radius of the sphere
 * @returns {x, y, z} coordinates in 3D space (all with positive Z)
 */
export function getSphericalPosition(
  index: number,
  total: number,
  radius: number
): { x: number; y: number; z: number } {
  // Define specific positions for better spread
  // Two rows: top row (3 points) and bottom row (3 points)
  const positions = [
    // Top row (left to right) - spread wider
    { theta: -1.0, phi: 0.8 },   // top-left
    { theta: 0, phi: 0.6 },      // top-center
    { theta: 1.0, phi: 0.8 },    // top-right
    // Bottom row (left to right) - spread wider
    { theta: -1.1, phi: 2.5 },   // bottom-left
    { theta: 0, phi: 2.7 },      // bottom-center
    { theta: 1.1, phi: 2.5 },    // bottom-right
  ]

  // Get position for this index (cycle if more than 6 points)
  const pos = positions[index % positions.length]

  // Convert spherical to Cartesian coordinates
  const x = radius * Math.sin(pos.phi) * Math.sin(pos.theta)
  const y = radius * Math.cos(pos.phi)
  const z = radius * Math.sin(pos.phi) * Math.cos(pos.theta)

  return { x, y, z }
}
