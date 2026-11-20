import { Link, useParams } from "react-router";
import { getGenre } from "../api";
import { Loadable } from "../components/Loadable";
import { SongRows } from "../components/SongRows";
import { useAsync } from "../hooks/useAsync";
import { songCount } from "../utils/format";
import { titleFor, useDocumentTitle } from "../hooks/useDocumentTitle";

export function GenrePage() {
  const { slug = "" } = useParams();
  const state = useAsync(getGenre, slug);

  useDocumentTitle(titleFor(state, (g) => g.name));

  return (
    <Loadable state={state}>
      {(genre) => (
        <>
          <p className="font-mono text-xs tracking-widest">
            <Link to="/" className="underline">
              GÉNEROS
            </Link>{" "}
            / {genre.name.toUpperCase()}
          </p>
          <h1 className="mt-4 text-6xl font-black uppercase leading-[0.92] tracking-tight sm:text-8xl">
            {genre.name}
          </h1>
          <p className="mt-3 font-mono text-xs tracking-widest text-hot">
            {songCount(genre.songs.length)}
          </p>
          <div className="my-6">
            <SongRows songs={genre.songs} />
          </div>
        </>
      )}
    </Loadable>
  );
}
