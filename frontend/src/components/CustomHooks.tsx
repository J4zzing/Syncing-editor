import { useRouteMatch } from "react-router-dom";

export function useDocId() {
  const match = useRouteMatch<{ id: string }>("/docs/:id");
  return match?.params.id;
}
