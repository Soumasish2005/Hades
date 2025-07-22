import React, { useState } from 'react'
import { User, LogOut, Github } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { signInWithGoogle, signInWithGitHub, signOut } from '../lib/firebase'

interface AuthButtonProps {
  variant?: 'navbar' | 'page'
  className?: string
}

const AuthButton: React.FC<AuthButtonProps> = ({ variant = 'navbar', className = '' }) => {
  const { user, loading } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setAuthLoading(true)
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Google sign in error:', error)
    } finally {
      setAuthLoading(false)
    }
  }

  const handleGitHubSignIn = async () => {
    setAuthLoading(true)
    try {
      await signInWithGitHub()
    } catch (error) {
      console.error('GitHub sign in error:', error)
    } finally {
      setAuthLoading(false)
    }
  }

  const handleSignOut = async () => {
    setAuthLoading(true)
    try {
      await signOut()
      setIsDropdownOpen(false)
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setAuthLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={`animate-pulse ${variant === 'navbar' ? 'w-8 h-8 bg-gray-600 rounded-full' : 'w-full h-12 bg-gray-600 rounded-lg'}`} />
    )
  }

  if (user) {
    if (variant === 'navbar') {
      return (
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-8 h-8 rounded-full bg-gradient-purple flex items-center justify-center text-white hover:opacity-90 transition-opacity"
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <User size={18} />
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 glass rounded-lg shadow-lg border border-gray-600 z-50">
              <div className="p-3 border-b border-gray-600">
                <div className="text-white text-sm font-medium truncate">
                  {user.displayName || user.email}
                </div>
                <div className="text-gray-400 text-xs truncate">{user.email}</div>
              </div>
              <button
                onClick={handleSignOut}
                disabled={authLoading}
                className="w-full flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10 transition-colors text-sm disabled:opacity-50"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      )
    }

    return (
      <div className={`flex items-center gap-3 p-4 glass rounded-lg ${className}`}>
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-gradient-purple rounded-full flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
        )}
        <div className="flex-1">
          <div className="text-white font-medium">
            {user.displayName || 'User'}
          </div>
          <div className="text-gray-400 text-sm">{user.email}</div>
        </div>
        <button
          onClick={handleSignOut}
          disabled={authLoading}
          className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
        >
          <LogOut size={18} />
        </button>
      </div>
    )
  }

  if (variant === 'navbar') {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleGoogleSignIn}
          disabled={authLoading}
          className="glass text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white hover:bg-opacity-20 transition-all disabled:opacity-50 flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>
        <button
          onClick={handleGitHubSignIn}
          disabled={authLoading}
          className="glass text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white hover:bg-opacity-20 transition-all disabled:opacity-50 flex items-center gap-2"
        >
          <Github size={16} />
          GitHub
        </button>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <button
        onClick={handleGoogleSignIn}
        disabled={authLoading}
        className="w-full flex items-center justify-center gap-3 px-6 py-3 glass hover:bg-white hover:bg-opacity-20 rounded-lg text-white font-medium transition-all disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </button>

      <button
        onClick={handleGitHubSignIn}
        disabled={authLoading}
        className="w-full flex items-center justify-center gap-3 px-6 py-3 glass hover:bg-white hover:bg-opacity-20 rounded-lg text-white font-medium transition-all disabled:opacity-50"
      >
        <Github size={20} />
        Continue with GitHub
      </button>
    </div>
  )
}

export default AuthButton