import { useEffect, useState } from "react";
import { ApiError } from "../api";

export type AsyncState<T> =
  | { status: "loading" }
  | { status: "error"; message: string; code: number | null }
  | { status: "success"; data: T };

export function useAsync<A, T>(
  load: (arg: A) => Promise<T>,
  arg: A,
): AsyncState<T> {
  const [result, setResult] = useState<{ arg: A; state: AsyncState<T> } | null>(
    null,
  );

  useEffect(() => {
    let active = true;
    load(arg)
      .then((data) => {
        if (active) setResult({ arg, state: { status: "success", data } });
      })
      .catch((err: Error) => {
        if (active) {
          const code = err instanceof ApiError ? err.status : null;
          setResult({
            arg,
            state: { status: "error", message: err.message, code },
          });
        }
      });
    return () => {
      active = false;
    };
  }, [load, arg]);

  return result && Object.is(result.arg, arg)
    ? result.state
    : { status: "loading" };
}
