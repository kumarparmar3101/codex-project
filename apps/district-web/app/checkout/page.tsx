import { getExperienceById } from '@shared/apis';
import { PrimaryButton, Section } from '@shared/ui';

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { eventId?: string; seat?: string };
}) {
  if (!searchParams.eventId || !searchParams.seat) {
    return <p>Missing event or seat selection.</p>;
  }

  const experience = await getExperienceById(searchParams.eventId);
  if (!experience) {
    return <p>Invalid event.</p>;
  }

  return (
    <Section title="Checkout">
      <p>{experience.title}</p>
      <p>
        {experience.category} · {experience.venue}
      </p>
      <p>Seat: {searchParams.seat}</p>
      <p>Total: ₹{experience.priceInr}</p>
      <PrimaryButton href={`/booking-success?eventId=${experience.id}&seat=${searchParams.seat}`}>Confirm booking</PrimaryButton>
    </Section>
  );
}
