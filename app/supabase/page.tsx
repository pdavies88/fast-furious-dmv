import { revalidatePath } from 'next/cache';
import supabase from '../utils/supabase';

export default async function Supabase() {
  const { data: characters, error } = await supabase
    .from('characters')
    .select('id, name, license, communication')
    .order('id');

  const handleSumbit = async (formData: FormData) => {
    'use server';
    const { name, license } = Object.fromEntries(formData.entries());

    await supabase.from('characters').insert({ name, license });

    revalidatePath('/supabase');
  };

  const disableCommunication = async (formData: FormData) => {
    'use server';
    console.log(formData);
    const { id } = Object.fromEntries(formData.entries());

    await supabase
      .from('characters')
      .update({ communication: false })
      .match({ id });

    revalidatePath('/supabase');
  };

  const enableCommunication = async (formData: FormData) => {
    'use server';
    console.log(formData);
    const { id } = Object.fromEntries(formData.entries());

    await supabase
      .from('characters')
      .update({ communication: true })
      .match({ id });

    revalidatePath('/supabase');
  };

  return (
    <>
      <h1 className="text-3xl">Characters</h1>
      <div className="flex flex-col gap-4">
        {characters?.map((character) => (
          <div className="flex flex-wrap gap-4 items-center" key={character.id}>
            <p>ID: {character.id}</p>
            <p>Name: {character.name}</p>
            <p>License: {character.license}</p>
            <p>Communication: {JSON.stringify(character.communication)}</p>
            <form className="flex gap-4" action={disableCommunication}>
              <input type="hidden" name="id" value={character.id} />
              <button
                formAction={disableCommunication}
                className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
              >
                Disable Communication
              </button>
              <button
                formAction={enableCommunication}
                className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
              >
                Enable Communication
              </button>
            </form>
          </div>
        ))}
      </div>
      <form action={handleSumbit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="license" placeholder="License" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
