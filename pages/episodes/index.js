import Link from "next/link";
import styles from "./index.module.css"
import "../../app/globals.css";

export async function getStaticProps() {
  const res = await fetch("https://rickandmortyapi.com/api/episode");
  const data = await res.json();

  return {
    props: {
      episodes: data.results,
    },
  };
}

export default function Episodes({ episodes }) {
  return (
    <div className={styles.episodesBody}>
      <h1 className={styles.episodesTitle}>Episodes</h1>
      <ul className={styles.episodesList}>
        {episodes.map((episode) => (
          <li key={episode.id} className={styles.episodesItem}>
            <Link className={styles.episodesLink} href={`/episodes/${episode.id}`}>{episode.name}</Link>
          </li>
        ))}
      </ul>
      <p className={ styles.episodesBack}>
        <Link className={ styles.episodesBackLink} href="/">Back to All Characters</Link>
      </p>
    </div>
  );
}
