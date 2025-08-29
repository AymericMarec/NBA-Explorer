'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const PUBLIC_PATHS = ['/login', '/register']

export default function AuthGuard() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!pathname) return
    if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) return

    const match = document.cookie.match(/(?:^|;\s*)token=([^;]+)/)
    const token = match ? decodeURIComponent(match[1]) : ''

    if (!token || token.trim() === '') {
      router.replace('/login')
    }
  }, [pathname, router])

  return null
}
