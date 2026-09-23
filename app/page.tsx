'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        // Admin work now happens entirely in the NCAA Command Center
        // (nigarbadminapp), not in this app -- every logged-in user lands
        // on the voter-facing dashboard regardless of role.
        router.push('/dashboard/elections')
      } else {
        // Not logged in, redirect to login
        router.push('/auth')
      }
    }

    checkAuth()
  }, [router])

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-900">
      <div className="text-center">
        <p className="text-slate-400">Redirecting...</p>
      </div>
    </main>
  )
}
