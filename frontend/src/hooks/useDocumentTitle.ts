import { useEffect } from "react";
import type { AsyncState } from "./useAsync";

const BASE = "SongDNA";

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE}` : BASE;
  }, [title]);
}

export function titleFor<T>(
  state: AsyncState<T>,
  pick: (data: T) => string,
): string | undefined {
  if (state.status === "success") return pick(state.data);
  if (state.status === "error") {
    return state.code === 404 || state.code === 400 ? "No encontrada" : "Error";
  }
  return undefined;
}
