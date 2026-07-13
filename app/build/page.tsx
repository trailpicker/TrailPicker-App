import { createBuild } from "./actions";

export default function BuildPage() {
  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">
        Create a Backpacking Build
      </h1>

      <form action={createBuild} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="My Summer Backpack"
          required
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          Create Build
        </button>
      </form>
    </main>
  );
}