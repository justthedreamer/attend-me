import {
    createRouter,
    createWebHistory,
} from "vue-router";
import Routes from "./routes";
import {inject} from "vue";
import type {ITokenStorage} from "../auth/ITokenStorage.ts";
import {ServiceCollection} from "../DI.ts";
import type {IAuthenticationService} from "../services/AuthenticationService.ts";
import {Role} from "../model/app/Roles.ts";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: Routes.All,
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.requireAuth) {
        const auth = inject<IAuthenticationService>(ServiceCollection.AUTHENTICATION_SERVICE.key)

        const role_from_storage: Role | null = auth.getRole();
        const require_role: Role | null = to.meta.role
        if (role_from_storage !== require_role) next({path: Routes.ErrorRoute.path})
    }
    // if path not require auth, move next in chain.
    next();
});

export default router;
