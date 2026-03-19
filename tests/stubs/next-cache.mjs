export function unstable_cache(fn) {
  return async (...args) => fn(...args);
}
