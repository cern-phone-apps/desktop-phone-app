export function truncateString (string, n) {
  return string.substr(0, n - 1) + (string.length > n ? '...' : '')
}
