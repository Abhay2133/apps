import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
    return NextResponse.redirect(new URL("/api/users", request.url));
}

export const config = {
    matcher : ['/api']
}