import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

export const routes: RouteDefinition[] = [
    {
        path: "/",
        component: lazy(() => import("../views/home")),
    },
    {
        path: "/foobar",
        component: lazy(() => import("../views/foobar")),
    },
]