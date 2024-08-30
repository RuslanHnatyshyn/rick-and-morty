import Link from "next/link";
import styles from "./index.module.css";
import "../../../app/globals.css";

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
    <main className={ styles.locationBody}>
      <h1 className={ styles.locationTitle1}>{location.name}</h1>
      <h2 className={ styles.locationTitle2}>Residents:</h2>
      <ul className={styles.locationList}>
        
        {residents.map((character) => (
          <li className={ styles.locationItem} key={character.id}>
            <Link className={ styles.locationLink} href={`/character/${character.id}`}>{character.name}</Link>
          </li>
        ))}
      </ul>
      <p className={ styles.locationBack}>
        <Link className={ styles.locationLinkBack} href="/locations">Back to All Locations</Link>
      </p>
    </main>
  );
}
