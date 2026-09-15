import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/hiking-trails")({ beforeLoad: () => { throw redirect({ to: "/hidden-places" }); } });
