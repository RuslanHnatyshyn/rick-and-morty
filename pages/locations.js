import Link from 'next/link';
import styles from './locations.module.css';
import "../app/globals.css";

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
    <main className={ styles.locationsBody}>
      <h1 className={ styles.locationsTitle}>Locations</h1>
      <ul className={styles.locationsList}>
        
        {locations.map((location) => (
          <li className={ styles.locationsItem} key={location.id}>
            <Link className={ styles.locationsLink} href={`/location/${location.id}`}>
              {location.name}
            </Link>
          </li>
        ))}
      </ul>
      <p className={ styles.episodesBack}>
        <Link className={ styles.episodesBackLink} href="/">Back to All Characters</Link>
      </p>
    </main>
  );
}
