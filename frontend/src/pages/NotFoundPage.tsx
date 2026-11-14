import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <>
      <h1 className=" text-6xl font-black uppercase leading-[0.92] tracking-tight">
        No encontrada
      </h1>
      <p className="mt-4 font-mono text-sm">
        Esta dirrección no existe en SongDNA
      </p>
      <Link
        to="/"
        className="mt-6 inline-block font-mono text-sm tracking-wider underline"
      >
        VOLVER A LA PORTADA
      </Link>
    </>
  );
}
