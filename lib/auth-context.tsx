"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

export type UserRole = "admin" | "user"

export interface User {
  id: string
  email: string
  nome: string
  cognome: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  "admin@foresteria.it": {
    password: "demo123",
    user: {
      id: "1",
      email: "admin@foresteria.it",
      nome: "Mario",
      cognome: "Rossi",
      role: "admin",
    },
  },
  "user@foresteria.it": {
    password: "demo123",
    user: {
      id: "2",
      email: "user@foresteria.it",
      nome: "Giuseppe",
      cognome: "Verdi",
      role: "user",
    },
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("foresteria_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userRecord = MOCK_USERS[email]

    if (!userRecord || userRecord.password !== password) {
      return { success: false, error: "Email o password non corretti" }
    }

    setUser(userRecord.user)
    localStorage.setItem("foresteria_user", JSON.stringify(userRecord.user))

    // Redirect based on role
    if (userRecord.user.role === "admin") {
      router.push("/dashboard/admin")
    } else {
      router.push("/dashboard/user")
    }

    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("foresteria_user")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
