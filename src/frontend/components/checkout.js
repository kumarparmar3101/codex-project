export function createCheckoutSummary({ seatCount, ticketPrice, onCheckout }) {
  return {
    total: Number((seatCount * ticketPrice).toFixed(2)),
    canCheckout: seatCount > 0,
    confirm() {
      if (seatCount === 0) return false;
      onCheckout();
      return true;
    }
  };
}
