'use client';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export default function AddButton() {
  // Form Status gives us different states to hook into
  // Since we are using a hook this needs to be a client component
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="bg-blue-600 disabled:bg-gray-500 inline-flex items-center justify-center rounded-full py-4 px-10 text-center text-base font-normal text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
    >
      Add Todo
    </button>
  );
}
