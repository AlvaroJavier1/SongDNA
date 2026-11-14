import { Link, useParams } from "react-router";
import { getSong } from "../api";
import { ArtistLinks } from "../components/ArtistLinks";
import { ConnectionList } from "../components/ConnectionList";
import { Loadable } from "../components/Loadable";
import { useAsync } from "../hooks/useAsync";

export function SongPage() {
  const id = Number(useParams().id);
  const state = useAsync(getSong, id);

  return (
    <Loadable state={state}>
      {(song) => (
        <article>
          <h1 className="text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-6xl">
            {song.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="text-2xl">
              <ArtistLinks artists={song.artists} />
            </p>
            <p className="font-mono text-sm text-hot">
              {song.year}
              {song.year && song.genre && " / "}
              {song.genre && (
                <Link to={`/generos/${song.genre.slug}`} className="underline">
                  {song.genre.name.toUpperCase()}
                </Link>
              )}
            </p>
          </div>
          <div className="my-6 h-0.5 bg-ink" />

          <ConnectionList
            title="SAMPLEA A"
            items={song.samples.map((c) => ({
              connection: c,
              song: c.sourceSong,
            }))}
          />
          <ConnectionList
            title="SAMPLEADA POR"
            items={song.sampledBy.map((c) => ({
              connection: c,
              song: c.derivativeSong,
            }))}
          />
        </article>
      )}
    </Loadable>
  );
}
