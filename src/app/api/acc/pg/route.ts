//app/api/acc/pg/route.ts

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {

  const authCookie = cookies();
  const session = authCookie.get("session");  
  
  if (session === undefined) {
    // const base = new URL(req.url);
    // const loginURL = `${base.origin}/login`;
    // return NextResponse.redirect(loginURL);
    return NextResponse.json({}, {status: 401})
  }

  return NextResponse.json({}, { status: 200 });
}
