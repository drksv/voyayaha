import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/travel-intel")({ beforeLoad: () => { throw redirect({ to: "/discover" }); } });
