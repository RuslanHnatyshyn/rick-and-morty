import Head from "next/head";
import Link from "next/link";

export async function getServerSideProps({ params }) {
  const { id } = params;
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const data = await res.json();

  return { props: { data } };
}

export default function Character({ data = {} }) {
  const { name, image, gender, location, origin, species, status } = data;

  return (
    <div className="container">
      <Head>
        <title>{name} - Rick and Morty</title>
      </Head>
      <main>
        <h1>{name}</h1>
        <div className="profile">
          <div className="profile-image">
            <img src={image} alt={name} />
          </div>
          <div className="profile-details">
            <h2>Character Details</h2>
            <ul>
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
      <p className="back">
        <Link href="/">Back to All Characters</Link>
      </p>
    </div>
  );
}
//index.js
