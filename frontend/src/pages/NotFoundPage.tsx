import { Link } from "react-router";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function NotFoundPage({
  message = "Esta dirección no existe en SongDNA",
}: {
  message?: string;
}) {
  useDocumentTitle("No encontrada");
  return (
    <>
      <h1 className=" text-6xl font-black uppercase leading-[0.92] tracking-tight">
        No encontrada
      </h1>
      <p className="mt-4 font-mono text-sm">{message}</p>
      <Link
        to="/"
        className="mt-6 inline-block font-mono text-sm tracking-wider underline"
      >
        VOLVER A LA PORTADA
      </Link>
    </>
  );
}
