// middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, applicationDefault, getApps } from 'firebase-admin/app';

// Initialize Firebase Admin SDK if not already initialized
// if (!getApps().length) {
//   console.log("getApps initialized...");
//   initializeApp({
//     credential: applicationDefault(),
//   });
// }

// export async function middleware(req: NextRequest) {
//   const authCookie = req.cookies.get('authToken');
//   const token = authCookie?.value;

//   if (!token) {
//     return NextResponse.redirect('/login'); // Redirect to login if not authenticated
//   }

//   try {
//     const auth = getAuth();
//     const decodedToken = await auth.verifyIdToken(token);
//     if (decodedToken) {
//       return NextResponse.next();
//     }
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     return NextResponse.redirect('/login');
//   }
// }

export function middleware(req: NextRequest) {
  console.log("middleware is running...");
  return NextResponse.next();
}

// Apply middleware only to the admin routes
export const config = {
  matcher: '/:path*',
};
