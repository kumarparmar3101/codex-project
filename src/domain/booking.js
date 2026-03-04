const allowedTransitions = {
  draft: ['held', 'cancelled'],
  held: ['confirmed', 'cancelled', 'expired'],
  confirmed: ['cancelled'],
  cancelled: [],
  expired: []
};

export function canTransition(from, to) {
  return allowedTransitions[from].includes(to);
}

export function transitionState(from, to) {
  if (!canTransition(from, to)) {
    throw new Error(`Invalid booking transition from ${from} to ${to}`);
  }
  return to;
}
