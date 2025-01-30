// Importing the necessary modules
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';  // Use this to access cookies in Next.js 13+

// This is the configuration for the middleware to match the request paths
export const config = {
  matcher: '/api/admin:path*', // Glob pattern to match the request path
}

// Middleware function
export function middleware(req) {
  // Accessing cookies using Next.js 15 middleware API
  const cookieStore = cookies(); // Get the cookies object

  // Log the cookies to see all available cookies in the request
  console.log('Cookies:', cookieStore);

  // Extract the access token from the cookies
  const accessToken = cookieStore.getAll(); // Get the 'accessToken' cookie
  
  if (!accessToken) {
    // If the access token is not present, log the message and return Unauthorized
    console.log('No access token found');
    return new NextResponse('Unauthorized', { status: 401 });
  } else {
    // If access token exists, log the token and proceed with further operations
    console.log('Access token found:', accessToken);
    // Optionally, you can verify or decode the token here
    return NextResponse.next(); // Continue to the next middleware or handler
  }
}
