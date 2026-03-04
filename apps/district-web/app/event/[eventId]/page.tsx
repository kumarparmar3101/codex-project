import { getExperienceById } from '@shared/apis';
import { PrimaryButton, Section } from '@shared/ui';

export default async function EventDetailPage({ params }: { params: { eventId: string } }) {
  const experience = await getExperienceById(params.eventId);

  if (!experience) {
    return <p>Event not found.</p>;
  }

  return (
    <Section title={experience.title}>
      <p>{experience.description}</p>
      <p>
        {experience.category} · {experience.venue}
      </p>
      <p>{new Date(experience.dateTimeIso).toLocaleString()}</p>
      <p>Starts at ₹{experience.priceInr}</p>
      <PrimaryButton href={`/event/${experience.id}/slots`}>Select slot & seats</PrimaryButton>
    </Section>
  );
}
