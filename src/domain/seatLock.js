export function isSeatLockExpired(lock, now = new Date()) {
  return now.getTime() - lock.lockedAt.getTime() >= lock.ttlMs;
}
