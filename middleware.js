import { NextResponse } from "next/server";

const decodeBase64 = (str) => {
  return Buffer.from(str, "base64").toString("utf8");
};

export function middleware(req) {
    console.log("✅ Middleware running for:", req.nextUrl.pathname);
  const token = req.cookies.get("token")?.value;

  const pathname = req.nextUrl.pathname;

  let userRole = null;

  if (token) {
    try {
      const base64Payload = token.split(".")[1];
      const decodedPayload = decodeBase64(base64Payload);
      const parsedPayload = JSON.parse(decodedPayload)
      userRole = parsedPayload.userType;

    } catch (error) {
        console.log("Token decode error: ", error);
    }
  }

  console.log("middleware", userRole)

  const recruiterRoutes = [
    '/jobpost',
    '/myjobposts',
    '/blogs/blogPost'
  ];

  const jobSeekerRoutes = [
    '/jobapply'
  ]

  const isRecruiterPage = recruiterRoutes.some((route)=>
    pathname.startsWith(route)
  );

  if(isRecruiterPage && userRole !== 'recruiter'){
    return NextResponse.redirect(new URL('/', req.url))
  }

  const isJobSeekerPage = jobSeekerRoutes.some((route)=>
    pathname.startsWith(route)
  );

  if(isJobSeekerPage && userRole == 'recruiter'){
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/jobpost/:path*", "/myjobposts/:path*", "/blogs/blogPost/:path*", "/jobapply/:path*"]
};
