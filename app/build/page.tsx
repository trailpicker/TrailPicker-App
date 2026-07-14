import { createBuild } from "./actions";

export default function BuildPage() {
  return (
    <main
      className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/garibaldi-lake.jpg')",
        backgroundPosition: "center 30%",
      }}
    >

      <div className="w-full max-w-xl">

        <div className="rounded-3xl bg-white shadow-xl border p-10">

          <div className="text-center">


            <h1 className="text-4xl font-bold tracking-tight">
              Create Your Backpacking Build
            </h1>

            <p className="mt-4 text-gray-600 text-lg">
              Build your perfect setup, track weight,
              compare costs, and plan your next adventure.
            </p>

          </div>


          <form
            action={createBuild}
            className="mt-10 space-y-5"
          >

            <div>
              <label className="block text-sm font-semibold mb-2">
                Build Name
              </label>

              <input
                name="name"
                placeholder="My Summer Backpack"
                className="
                                    w-full
                                    rounded-xl
                                    border
                                    px-4
                                    py-3
                                    text-lg
                                    outline-none
                                    focus:ring-2
                                    focus:ring-green-700
                                "
                required
              />
            </div>


            <button
              className="
                                w-full
                                rounded-xl
                                bg-green-900
                                py-3
                                text-lg
                                font-semibold
                                text-white
                                hover:bg-green-800
                                transition
                            "
            >
              Create Build
            </button>

          </form>

        </div>


        <p className="text-center text-sm text-white mt-6 drop-shadow-md">
          Add gear • Track weight • Optimize your pack
        </p>

      </div>

    </main>
  );
}