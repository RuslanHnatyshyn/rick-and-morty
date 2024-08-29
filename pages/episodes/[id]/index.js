export async function getServerSideProps({ params }) {
  const res = await fetch(`https://rickandmortyapi.com/api/episode/${params.id}`);
  const episode = await res.json();

  const characterPromises = episode.characters.map((url) => fetch(url).then(res => res.json()));
  const characters = await Promise.all(characterPromises);

  return { props: { episode, characters } };
}

export default function Episode({ episode, characters }) {
  return (
    <div>
      <h1>{episode.name}</h1>
      <h2>Characters</h2>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <img src={character.image} alt={character.name} />
            <p>{character.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
