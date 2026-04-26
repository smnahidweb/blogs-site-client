import { NextRequest, NextResponse } from "next/server";
import { userServices } from "./services/user.services";
import { Roles } from "./constrant/roles";

export async function proxy(request: NextRequest) {
    try {
        let isAuthenticated = false;
        let isAdmin = false;

        const cookieHeader = request.headers.get("cookie") || undefined;
        const { data, error } = await userServices.getSession(cookieHeader);
        console.log("middleware data ", data, "error", error)

        if (data) {
            isAuthenticated = true;
            isAdmin = data?.user?.role === Roles.admin;
        }

        if (!isAuthenticated) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        console.log("Hello from middleware", request.url);
        return NextResponse.next();

    } catch (error) {
        console.error("Middleware Error:", error)
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*"]
};