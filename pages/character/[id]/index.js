import Head from "next/head";
import Link from "next/link";
import styles from "./index.module.css";
import "../../../app/globals.css";

export async function getServerSideProps({ params }) {
  const { id } = params;
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const data = await res.json();

  return { props: { data } };
}

export default function Character({ data = {} }) {
  const { name, image, gender, location, origin, species, status } = data;

  return (
    <div className={styles.cardBody}>
      <Head>
        <title>{name} - Rick and Morty</title>
      </Head>

      <main>
        <div className={styles.card}>
          <div className={styles.cardImg}>
            <img className={ styles.img} src={image} alt={name} />
          </div>
          <div className={ styles.details}>
            <h1>{name}</h1>
            <h2>Character Details</h2>
            <ul className={ styles.list}>
              <li>
                <strong>Name:</strong> {name}
              </li>
              <li>
                <strong>Status:</strong> {status}
              </li>
              <li>
                <strong>Gender:</strong> {gender}
              </li>
              <li>
                <strong>Species:</strong> {species}
              </li>
              <li>
                <strong>Location:</strong> {location?.name}
              </li>
              <li>
                <strong>Originally From:</strong> {origin?.name}
              </li>
            </ul>
          </div>
        </div>
      </main>
      
      <p >
        <Link className={ styles.back} href="/">Back to All Characters</Link>
      </p>
    </div>
  );
}
