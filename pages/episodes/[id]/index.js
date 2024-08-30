import styles from "./index.module.css";
import Link from "next/link";

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `https://rickandmortyapi.com/api/episode/${params.id}`
  );
  const episode = await res.json();

  const characterPromises = episode.characters.map((url) =>
    fetch(url).then((res) => res.json())
  );
  const characters = await Promise.all(characterPromises);

  return { props: { episode, characters } };
}

export default function Episode({ episode, characters }) {
  return (
    <div className={styles.episodeBody}>
      <h1 className={styles.episodeTitle}>{episode.name}</h1>
      <h2 className={styles.episodeCharacters}>Characters</h2>
      <ul className={styles.episodeList}>
        {characters.map((character) => (
          <li className={styles.episodeItem} key={character.id}>
            <img
              className={styles.episodeImg}
              src={character.image}
              alt={character.name}
            />
            <p className={styles.name}>{character.name}</p>
          </li>
        ))}
      </ul>
      <p className={styles.episodeBack}>
        <Link className={styles.episodeBackLink} href="/">Back to All Characters</Link>
      </p>
    </div>
  );
}
