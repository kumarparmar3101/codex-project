export function createSeatSelection(seats) {
  const selected = new Set();

  return {
    toggleSeat(seatId) {
      if (!seats.includes(seatId)) throw new Error(`Unknown seat ${seatId}`);
      if (selected.has(seatId)) selected.delete(seatId);
      else selected.add(seatId);
    },
    getSelectedSeats() {
      return [...selected];
    },
    render() {
      return {
        title: 'Select Seats',
        seats: seats.map((seat) => ({ id: seat, selected: selected.has(seat) })),
        summary: `${selected.size} seats selected`
      };
    }
  };
}
