import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/travel-memories")({
  beforeLoad: () => {
    throw redirect({ to: "/hidden-places" });
  },
});
