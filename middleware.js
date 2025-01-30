export const config = {
  matcher: '/api/admin:path*', // This is a glob pattern which will be used to match the incoming request path.
}

// This is a middleware function which will be called before the actual route handler function is called.
export function middleware(req) {
  const cookies = req.cookies.getAll("accessToken");
  if (cookies.length === 0) {
    console.log('No access token found');
  } else {
    console.log('Cookies:', cookies);
  }
}