import type {Router} from "vue-router";
import Routes from "../router/routes.ts";
import {Role} from "../model/Roles.ts";

export async function redirectToDesktopAsync(router: Router, role: Role) {
    switch (role) {
        case Role.STUDENT: {
            await router.push({name: Routes.StudentDesktop.name});
            break;

        }
        case Role.LECTURER: {
            await router.push({name: Routes.LecturerDesktop.name});
            break;

        }
        default: {
            const neverValue: never = role;
            throw new Error(`Unhandled role: ${neverValue}`);
        }
    }
}