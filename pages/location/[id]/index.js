// pages/location/[id]/index.js
import Link from 'next/link';

export async function getServerSideProps({ params }) {
  const { id } = params;
  const res = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
  const locationData = await res.json();

  const characterPromises = locationData.residents.map((url) =>
    fetch(url).then((res) => res.json())
  );
  const residents = await Promise.all(characterPromises);

  return {
    props: {
      location: locationData,
      residents,
    },
  };
}

export default function Location({ location, residents }) {
  return (
    <main>
      <h1>{location.name}</h1>
      <h2>Residents:</h2>
      <ul>
        {residents.map((character) => (
          <li key={character.id}>
            <Link href={`/character/${character.id}`}>
              {character.name}
            </Link>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/locations">Back to All Locations</Link>
      </p>
    </main>
  );
}
