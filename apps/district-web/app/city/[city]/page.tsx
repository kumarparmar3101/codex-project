import { getCategoriesByCity, getExperiencesByCity } from '@shared/apis';
import { ExperienceCard, Pill, PrimaryButton, Section } from '@shared/ui';

export default async function CityCategoriesPage({ params }: { params: { city: string } }) {
  const [categories, events] = await Promise.all([getCategoriesByCity(params.city), getExperiencesByCity(params.city)]);

  if (events.length === 0) {
    return (
      <Section title={`No experiences in ${params.city}`}>
        <p>Try another city.</p>
        <PrimaryButton href="/">Back to home</PrimaryButton>
      </Section>
    );
  }

  return (
    <>
      <Section title={`Categories in ${params.city}`}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {categories.map((category) => (
            <Pill key={category}>{category}</Pill>
          ))}
        </div>
      </Section>

      <Section title="Available events">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {events.map((exp) => (
            <ExperienceCard
              key={exp.id}
              title={exp.title}
              meta={`${exp.category} · ${exp.venue}`}
              description={`From ₹${exp.priceInr}`}
              ctaHref={`/event/${exp.id}`}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
