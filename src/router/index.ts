import {createRouter, createWebHistory} from "vue-router";
import Routes from "./routes";
import {SessionStorage} from "../auth/SessionStorage.ts";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: Routes.All,
});

router.beforeEach((to, from, next) => {
    // Check if the route requires authentication
    if (to.meta.requireAuth) {
        // Check if the token has expired
        const tokenExpired = new Date(SessionStorage.getAccessTokenExpiry()) < new Date();
        if (tokenExpired) {
            next({path: Routes.HomeRoute.path});
            return;
        }

        // Check if the user role matches the required role for the route
        const role = SessionStorage.getRole();
        if (role !== to.meta.role) {
            console.error("Unauthorized access, role mismatch.");
            next(false);
            return;
        }

        next(); // Proceed to the route if all checks pass
    } else {
        next(); // Proceed if no authentication required
    }
});

export default router;