import { revalidatePath } from "next/cache";
import supabase from "./utils/supabase";

export default async function Home() {

	const { data: characters, error } = await supabase
	.from('characters')
	.select("id, name, license")

	const handleSumbit = async (formData: FormData) => {
		'use server'
		const {name, license} = Object.fromEntries(formData.entries())

		await supabase.from('characters').insert({name, license})

		revalidatePath('/');
	}

  return (
    <>
      <h1 className="text-3xl">Characters</h1>
      {characters?.map((character) => (
		<div key={character.id}>
			<p>{character.name}</p>
			<p>{character.license}</p>
		</div>
	  ))}
	  <form action={handleSumbit}>
		<input type="text" name="name" placeholder="Name" />
		<input type="text" name="license" placeholder="License" />
		<button type="submit">Submit</button>
	  </form>
    </>
  );
}
