export function calculateTicketPrice(basePrice, rule) {
  const subtotal = basePrice * rule.seatCategoryMultiplier * rule.demandMultiplier;
  const taxed = subtotal * (1 + rule.taxRate);
  return Number((taxed + rule.fees).toFixed(2));
}
