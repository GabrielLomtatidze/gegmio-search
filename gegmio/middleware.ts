import createMiddleware from "next-intl/middleware";
import { routing } from "./i18/routing";

export default createMiddleware(routing)

export const confg = {
    matcher: "/((?!api|tpc|_next|_vercel|.*..*).*)"
}