import { Link } from "react-router";
import type { Artist } from "../types";

export function ArtistLinks({ artists }: { artists: Artist[] }) {
  return (
    <>
      {artists.map((a, i) => (
        <span key={a.id}>
          {i > 0 && ", "}
          <Link
            to={`/artistas/${a.id}`}
            className="underline hover:text-hot focus-visible:outline-4 focus-visible:outline-hot"
          >
            {a.name}
          </Link>
        </span>
      ))}
    </>
  );
}
