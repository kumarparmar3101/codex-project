import test from 'node:test';
import assert from 'node:assert/strict';
import { createSeatSelection } from '../../src/frontend/components/seatSelection.js';

test('seat selection toggles and exposes view model', () => {
  const component = createSeatSelection(['A1', 'A2']);

  component.toggleSeat('A1');
  assert.deepEqual(component.getSelectedSeats(), ['A1']);
  assert.equal(component.render().summary, '1 seats selected');

  component.toggleSeat('A1');
  assert.deepEqual(component.getSelectedSeats(), []);
  assert.equal(component.render().summary, '0 seats selected');
});
