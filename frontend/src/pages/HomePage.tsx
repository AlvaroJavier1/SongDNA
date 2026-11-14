import { Link } from "react-router";
import { getArtists, getGenres } from "../api";
import { Loadable } from "../components/Loadable";
import { useAsync } from "../hooks/useAsync";
import { groupByLetter, songCount } from "../utils/format";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function HomePage() {
  const genres = useAsync(getGenres, undefined);
  const artists = useAsync(getArtists, undefined);

  return (
    <>
      <h1 className="text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-6xl">
        Bienvenido a SongDNA
      </h1>
      <p className="mt-4 font-mono text-sm leading-relaxed">
        Biblioteca de samples e interpolaciones: de dónde viene esa canción.
      </p>

      <div className="my-8 h-0.5 bg-ink" />
      <h2 className="font-mono text-xs tracking-widest">GÉNEROS</h2>
      <Loadable state={genres}>
        {(list) =>
          list.length === 0 ? (
            <p className="mt-3 text-ink-soft">Aún no hay géneros.</p>
          ) : (
            <ul className="mt-3 flex flex-wrap gap-2.5">
              {list.map((g) => (
                <li key={g.id}>
                  <Link
                    to={`/generos/${g.slug}`}
                    className="inline-block border-2 border-ink px-3.5 py-2 text-sm font-black uppercase hover:bg-ink hover:text-paper focus-visible:outline-4 focus-visible:outline-hot"
                  >
                    {g.name}{" "}
                    <span className="font-mono font-normal text-hot">
                      {g._count.songs}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )
        }
      </Loadable>

      <div className="my-8 h-0.5 bg-ink" />
      <h2 className="font-mono text-xs tracking-widest">
        ARTISTAS DE LA A A LA Z
      </h2>
      <Loadable state={artists}>
        {(list) => {
          if (list.length === 0)
            return <p className="mt-3 text-ink-soft">Aún no hay artistas.</p>;
          const groups = groupByLetter(list);
          const active = new Set(groups.map(([letter]) => letter));

          return (
            <>
              <nav
                aria-label="Índice de letras"
                className="mt-3 flex flex-wrap gap-x-2 font-mono text-xs tracking-widest"
              >
                {ALPHABET.map((l) =>
                  active.has(l) ? (
                    <a
                      key={l}
                      href={`#letra-${l}`}
                      className="font-bold underline"
                    >
                      {l}
                    </a>
                  ) : (
                    <span key={l} className="text-ink-soft/50">
                      {l}
                    </span>
                  ),
                )}
              </nav>
              <div className="mt-4">
                {groups.map(([letter, items]) => (
                  <section
                    key={letter}
                    id={`letra-${letter}`}
                    className="scroll-mt-4"
                  >
                    {items.map((a, i) => (
                      <Link
                        key={a.id}
                        to={`/artistas/${a.id}`}
                        className="flex items-baseline gap-4 border-t-2 border-ink py-2.5 hover:bg-ink hover:text-paper focus-visible:outline-4 focus-visible:outline-hot"
                      >
                        <span className="w-9 text-3xl font-black text-hot">
                          {i === 0 ? letter : ""}
                        </span>
                        <span className="flex-1 text-lg">{a.name}</span>
                        <span className="font-mono text-xs">
                          {songCount(a._count.songs)}
                        </span>
                      </Link>
                    ))}
                  </section>
                ))}
              </div>
            </>
          );
        }}
      </Loadable>
    </>
  );
}
