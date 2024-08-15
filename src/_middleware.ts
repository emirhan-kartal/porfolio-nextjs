import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("test");
    console.log(token, "token")
    if (!token) {
        
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    console.log("selamke")
    return NextResponse.next();
    }
export const config = {
    matcher: "/admin/:path*",
};
