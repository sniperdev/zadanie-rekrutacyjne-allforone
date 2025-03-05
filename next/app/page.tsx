import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <h1 className="text-3xl font-bold">Witaj w aplikacji pogodowej</h1>
      <p className="mt-4 text-lg">
        Sprawdzaj i zapisuj raporty meteorologiczne.
      </p>
      <Link
        href="/weather"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Przejdź do raportów
      </Link>
    </main>
  );
}
