"use client";

export default function CreateNicknamePage() {
  return (
    <main className="min-h-screen flex flex-col px-6 py-8 bg-gradient-to-b from-indigo-600 to-indigo-400 text-white">
      <section className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white bg-opacity-80 rounded-lg p-6 text-indigo-900 shadow-md">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Create Your Nickname
          </h1>
          <form /*onSubmit={}*/ className="space-y-4">
            <div>
              <label htmlFor="nickname" className="block mb-1 font-medium">
                Nickname
              </label>
              <input
                id="nickname"
                type="text"
                //value={}
                onChange={(e) => {
                  
                }}
                className="w-full px-4 py-2 rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Save Nickname
            </button>
          </form>
        </div>
      </section>
      <footer className="text-sm opacity-80 mt-8 text-center">
        © {new Date().getFullYear()} Best Chat App
      </footer>
    </main>
  );
}