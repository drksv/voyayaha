import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/my-voyayaha")({
  beforeLoad: () => {
    throw redirect({ to: "/travel-memories" });
  },
});
