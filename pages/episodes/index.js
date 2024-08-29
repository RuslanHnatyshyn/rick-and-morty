import Link from "next/link";

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
    <div>
      <h1>Episodes</h1>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}>
            <Link href={`/episodes/${episode.id}`}>{episode.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
