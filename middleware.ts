import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { method, url } = req;
  console.log(` ${method} ${url}`);

  // Only attemp to read req.body if req is POST/PUT/PATCH (and no form-data)
  if (["POST", "PUT", "PATCH"].includes(method)) {
    try {
      const contentType = req.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const body = await req.json();
        console.log(" Body:", body);
      } else {
        console.log(" Non-JSON body or form data");
      }
    } catch {
      console.log(" ⚠️ No readable body");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
