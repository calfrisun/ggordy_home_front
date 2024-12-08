import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

export const routes: RouteDefinition[] = [
    {
        path: "/",
        component: lazy(() => import("../views/home")),
    },
    // {
    //     path: "/login",
    //     component: lazy(() => import("../views/login")),
    // },
    {
        path: "/login",
        component: lazy(() => import("../views/snsLogin")),
    },
    {
        path: "/auth",
        component: lazy(() => import("../views/auth")),
    },
    {
        path: "/upload",
        component: lazy(() => import("../views/upload")),
    },
]
