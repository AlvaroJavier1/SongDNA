import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function Layout() {
  return (
    <div className="mx-auto mx-w-3xl px-5 py-10">
      <ScrollToTop />
      <header>
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-sm font-black tracking-[0.2em] focus-visible:outline-4 focus-visible:outline-hot"
          >
            SONGDNA
          </Link>
          <Link
            to="/"
            className="font-mono text-xs tracking-wider underline focus-visible:outline-4 focus-visible:outline-hot"
          >
            CANCIONES
          </Link>
        </div>
        <div className="mt-4 h-1 bg-ink" />
      </header>
      <main className="mt-8">
        <Outlet />
      </main>
    </div>
  );
}
