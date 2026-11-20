import { getSongs } from "../api";
import { Loadable } from "../components/Loadable";
import { SongRows } from "../components/SongRows";
import { useAsync } from "../hooks/useAsync";
import { songCount } from "../utils/format";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function CatalogPage() {
  const songs = useAsync(getSongs, undefined);

  useDocumentTitle("Canciones");

  return (
    <Loadable state={songs}>
      {(list) => (
        <>
          <h1 className="text-6xl font-black uppercase leading-[0.92] tracking-tight sm:text-8xl">
            Canciones
          </h1>
          <p className="mt-3 font-mono text-xs tracking-widest text-hot">
            {songCount(list.length)}
          </p>
          <div className="my-6">
            <SongRows songs={list} showGenre />
          </div>
        </>
      )}
    </Loadable>
  );
}
