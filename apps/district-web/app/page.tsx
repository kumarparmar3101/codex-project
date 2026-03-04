import { getCities, getCuratedExperiences } from '@shared/apis';
import { ExperienceCard, Pill, Section } from '@shared/ui';

export default async function HomePage() {
  const [curated, cities] = await Promise.all([getCuratedExperiences(), getCities()]);

  return (
    <>
      <Section title="Curated experiences">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {curated.map((exp) => (
            <ExperienceCard
              key={exp.id}
              title={exp.title}
              meta={`${exp.category} · ${exp.venue}`}
              description={new Date(exp.dateTimeIso).toLocaleString()}
              ctaHref={`/event/${exp.id}`}
            />
          ))}
        </div>
      </Section>

      <Section title="Browse by city">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {cities.map((city) => (
            <a key={city} href={`/city/${city}`}>
              <Pill>{city[0].toUpperCase() + city.slice(1)}</Pill>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
