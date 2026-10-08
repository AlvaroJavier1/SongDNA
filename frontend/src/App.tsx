import { useState } from "react";
import { SongList } from "./components/SongList";
import { SongDetail } from "./components/SongDetail";

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <header className="mb-4 flex items-center justify-between">
        <span className="font-black tracking-[0.2em]">SONG DNA</span>
        <span className="font'mono text-xs tracking-wider">
          FICHA DE CANCIÓN
        </span>
      </header>
      <div className="mb-8 h-1 bg-ink" />
      {selectedId ? (
        <SongDetail
          key={selectedId}
          id={selectedId}
          onBack={() => setSelectedId(null)}
        />
      ) : (
        <SongList onSelect={setSelectedId} />
      )}
    </main>
  );
}
