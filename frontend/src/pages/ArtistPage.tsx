import { Link, useParams } from "react-router";
import { getArtist } from "../api";
import { Loadable } from "../components/Loadable";
import { SongRows } from "../components/SongRows";
import { useAsync } from "../hooks/useAsync";
import { songCount } from "../utils/format";
import { titleFor, useDocumentTitle } from "../hooks/useDocumentTitle";

export function ArtistPage() {
  const id = Number(useParams().id);
  const state = useAsync(getArtist, id);

  useDocumentTitle(titleFor(state, (a) => a.name));

  return (
    <Loadable state={state}>
      {(artist) => (
        <>
          <p className="font-mono text-xs tracking-widest">
            <Link to="/" className="underline">
              ARTISTAS
            </Link>{" "}
            / {artist.name.toUpperCase()}
          </p>
          <h1 className="mt-4 text-6xl font-black uppercase leading-[0.92] tracking-tight sm:text-8xl">
            {artist.name}
          </h1>
          <p className="mt-3 font-mono text-xs tracking-widest text-hot">
            {songCount(artist.songs.length)}
          </p>
          <div>
            <SongRows songs={artist.songs} showGenre />
          </div>
        </>
      )}
    </Loadable>
  );
}
