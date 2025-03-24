import { updateSession } from '@/utils/supabase/middleware'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  console.log('middleware was run')
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/dashboard/:path*', // Match all routes starting with /dashboard
  ],
}