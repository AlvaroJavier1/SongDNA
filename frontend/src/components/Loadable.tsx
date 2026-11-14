import type { ReactNode } from "react";
import type { AsyncState } from "../hooks/useAsync";

interface Props<T> {
  state: AsyncState<T>;
  children: (data: T) => ReactNode;
}

export function Loadable<T>({ state, children }: Props<T>) {
  if (state.status === "loading")
    return <p className="font-mono">Cargando...</p>;
  if (state.status === "error") {
    return (
      <p role="alert" className="font-mono">
        No se pudo cargar: {state.message}
      </p>
    );
  }
  return <>{children(state.data)}</>;
}
