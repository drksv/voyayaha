import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/sacred-india")({ beforeLoad: () => { throw redirect({ to: "/spiritual-journeys" }); } });
