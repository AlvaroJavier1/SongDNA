import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { ArtistPage } from "./pages/ArtistPage";
import { CatalogPage } from "./pages/CatalogPage";
import { GenrePage } from "./pages/GenrePage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SongPage } from "./pages/SongPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="canciones" element={<CatalogPage />} />
        <Route path="canciones/:id" element={<SongPage />} />
        <Route path="generos/:slug" element={<GenrePage />} />
        <Route path="artistas/:id" element={<ArtistPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
