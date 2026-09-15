import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/village-tourism")({ beforeLoad: () => { throw redirect({ to: "/village-local" }); } });
