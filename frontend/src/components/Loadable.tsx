import type { ReactNode } from "react";
import type { AsyncState } from "../hooks/useAsync";
import { NotFoundPage } from "../pages/NotFoundPage";

interface Props<T> {
  state: AsyncState<T>;
  children: (data: T) => ReactNode;
}

export function Loadable<T>({ state, children }: Props<T>) {
  if (state.status === "loading")
    return <p className="font-mono">Cargando...</p>;
  if (state.status === "error") {
    if (state.code === 404 || state.code === 400) {
      return (
        <NotFoundPage
          message={state.code === 404 ? state.message : undefined}
        />
      );
    }
    return (
      <p role="alert" className="font-mono">
        No se pudo cargar: {state.message}
      </p>
    );
  }
  return <>{children(state.data)}</>;
}
