// pages/locations.js
import Link from 'next/link';

export async function getServerSideProps() {
  const res = await fetch('https://rickandmortyapi.com/api/location');
  const data = await res.json();

  return {
    props: {
      locations: data.results,
    },
  };
}

export default function Locations({ locations }) {
  return (
    <main>
      <h1>Locations</h1>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            <Link href={`/location/${location.id}`}>
              {location.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
