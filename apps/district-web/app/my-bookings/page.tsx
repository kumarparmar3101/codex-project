import { getMyBookings } from '@shared/apis';
import { PrimaryButton, Section } from '@shared/ui';

export default async function MyBookingsPage() {
  const bookings = await getMyBookings();

  if (bookings.length === 0) {
    return (
      <Section title="My bookings">
        <p>No bookings yet.</p>
        <PrimaryButton href="/">Explore events</PrimaryButton>
      </Section>
    );
  }

  return (
    <Section title="My bookings">
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.75rem' }}>
        {bookings.map((booking) => (
          <li key={booking.bookingId} className="ui-card">
            <strong>{booking.experience?.title ?? 'Unknown event'}</strong>
            <div className="ui-muted">Booking ID: {booking.bookingId}</div>
            <div>Seat: {booking.seat}</div>
            <div>Status: {booking.status}</div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
