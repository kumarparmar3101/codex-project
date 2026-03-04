import { getExperienceById } from '@shared/apis';
import { PrimaryButton, SeatPicker, Section } from '@shared/ui';

export default async function SlotSelectionPage({
  params,
  searchParams,
}: {
  params: { eventId: string };
  searchParams: { seat?: string };
}) {
  const experience = await getExperienceById(params.eventId);

  if (!experience) {
    return <p>Event not found.</p>;
  }

  const selectedSeat = searchParams.seat;

  return (
    <Section title={`Choose your seat for ${experience.title}`}>
      <p>Slot: {new Date(experience.dateTimeIso).toLocaleString()}</p>
      <SeatPicker seats={experience.seats} selectedSeat={selectedSeat} baseHref={`/event/${experience.id}/slots`} />
      {selectedSeat ? (
        <div style={{ marginTop: '1rem' }}>
          <p>Selected seat: {selectedSeat}</p>
          <PrimaryButton href={`/checkout?eventId=${experience.id}&seat=${selectedSeat}`}>Continue to checkout</PrimaryButton>
        </div>
      ) : null}
    </Section>
  );
}
