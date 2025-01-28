/**
 * Authentication configuration for the application
 * This file contains the core authentication settings and routing logic
 */
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  // Custom authentication pages
  pages: {
    signIn: '/login',    // Custom login page path
    newUser: '/',        // Redirect new users to home page
  },
  
  // Authentication providers configuration
  providers: [
    // Providers are added in auth.ts since some (like bcrypt) 
    // are only compatible with Node.js environments
  ],
  
  // Authorization and routing callbacks
  callbacks: {
    /**
     * Authorization callback to handle route protection and redirects
     * @param auth - Authentication session data
     * @param request - Next.js request object containing URL info
     * @returns boolean or Response for redirection
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnChat = nextUrl.pathname.startsWith('/');
      const isOnRegister = nextUrl.pathname.startsWith('/register');
      const isOnLogin = nextUrl.pathname.startsWith('/login');

      // Redirect logged-in users away from auth pages
      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL('/', nextUrl as unknown as URL));
      }

      // Allow access to register and login pages
      if (isOnRegister || isOnLogin) {
        return true;
      }

      // Protect chat routes - require authentication
      if (isOnChat) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login
      }

      // Redirect logged-in users to home from other pages
      if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl as unknown as URL));
      }

      // Allow access to all other routes
      return true;
    },
  },
} satisfies NextAuthConfig;
