'use client'

import { signIn } from "next-auth/react"

export default function SignIn() {
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Sign in with GitHub
      </button>
    </div>
  )
}