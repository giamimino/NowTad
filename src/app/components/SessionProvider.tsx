"use client"
import React, { useEffect, useState } from 'react'
import { SessionContext } from '../context/SessionContext'
import { Session } from 'next-auth'

export default function SessionProvider(
  { children }:
  Readonly<{
    children: React.ReactNode
  }>) {
    const [user, setUser] = useState<Session | null>(null)
    
    useEffect(() => {
      fetch("/api/getSession").then(res => res.json())
      .then(data => {
        if(data.success) {
          setUser(data.session)
        }
      })
    }, [])
  return (
    <SessionContext.Provider value={user}>
      {children}
    </SessionContext.Provider>
  )
}
