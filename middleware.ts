// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, applicationDefault } from 'firebase-admin/app';

// // Initialize Firebase Admin SDK
// initializeApp({
//   credential: applicationDefault(),
// });

export async function middleware(req: NextRequest) {
  console.log("Middleware is running well...")
}


// Apply middleware only to the admin routes
export const config = {
  matcher: '/admin/:path*',
};
