import PokemonList from './PokemonList';

export default function PokemonSearch() {
  async function search(search: string) {
    'use server';

    console.log('searching for', search);

    // After the first hit this will be a cached fetch
    // Any of the manipluations with this data on the client will be with cached data
    const pokemonRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
    );
    const pokemonData = await pokemonRes.json();
    return pokemonData.results
      .filter((p: { name: string }) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
      .map((p: { name: string }) => p.name)
      .slice(0, 50);
  }

  return (
    <main className="p-5">
      <PokemonList search={search} />
    </main>
  );
}
