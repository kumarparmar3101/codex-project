import { Section, PrimaryButton } from '@shared/ui';

export default function BookingSuccessPage({
  searchParams,
}: {
  searchParams: { eventId?: string; seat?: string };
}) {
  return (
    <Section title="Booking successful">
      <p>Your booking is confirmed.</p>
      <p>
        Event ID: {searchParams.eventId} · Seat: {searchParams.seat}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <PrimaryButton href="/my-bookings">Go to my bookings</PrimaryButton>
        <a href="/">Continue browsing</a>
      </div>
    </Section>
  );
}
