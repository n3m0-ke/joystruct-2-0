// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, applicationDefault } from 'firebase-admin/app';

// Initialize Firebase Admin SDK
const adminApp = initializeApp({
  credential: applicationDefault(),
});

export function middleware(req: NextRequest) {
  const authCookie = req.cookies.get('authToken');
  const token = authCookie?.value; // Extract the token string from the RequestCookie object

  if (!token) {
    return NextResponse.redirect('/login'); // Redirect to login if not authenticated
  }

  // Verify token
  try {
    const auth = getAuth(adminApp);
    auth.verifyIdToken(token);
    return NextResponse.next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.redirect('/login');
  }
}

// Apply middleware only to the admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
