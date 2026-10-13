import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid flex-1 place-items-center px-6 py-24 text-center">
      <div>
        <p className="font-mono text-sm text-mute">404</p>
        <h1 className="heading mt-2 text-5xl">Introuvable.</h1>
        <p className="mt-3 text-mute">Cet élément n'existe pas, ou plus.</p>
        <Link href="/" className="btn-solid mt-8">
          Retour à la librairie
        </Link>
      </div>
    </div>
  );
}
