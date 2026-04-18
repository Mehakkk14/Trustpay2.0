'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Mail, Globe, Wallet as WalletIcon, ArrowRight, LogOut } from 'lucide-react';
import { useDisconnect } from 'wagmi';

const googleProvider = new GoogleAuthProvider();

export default function LoginPage() {
  const { address: walletAddress, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  
  const [mode, setMode] = useState<'email' | 'google' | 'wallet' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('hirer');
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');

  // Auto login with wallet if connected
  useEffect(() => {
    if (isConnected && walletAddress && mode === 'wallet') {
      handleWalletLogin();
    }
  }, [isConnected, walletAddress, mode]);

  const saveProfile = async (uid: string, userData: any) => {
    try {
      await setDoc(doc(db, 'user_profiles', walletAddress || uid), {
        id: walletAddress || uid,
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'hirer',
        createdAt: new Date().toISOString(),
        ...userData
      });
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveProfile(result.user.uid, {
        name: result.user.displayName || '',
        email: result.user.email || '',
        role
      });
      setTimeout(() => router.push(`/dashboard/${role}`), 500);
    } catch (err: any) {
      setError(err.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      
      await saveProfile(email, { name, email, role });
      setTimeout(() => router.push(`/dashboard/${role}`), 500);
    } catch (err: any) {
      setError(err.message || 'Email auth failed');
    } finally {
      setLoading(false);
    }
  };

  const handleWalletLogin = async () => {
    if (!isConnected || !walletAddress) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await saveProfile(walletAddress, { name, role });
      setTimeout(() => router.push(`/dashboard/${role}`), 500);
    } catch (err: any) {
      setError(err.message || 'Wallet login failed');
    } finally {
      setLoading(false);
    }
  };

  // Initial mode selection screen
  if (!mode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-slate-900/50 border border-indigo-500/20 rounded-2xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-white">Welcome</h1>
              <p className="text-slate-400 text-sm">Choose how to sign in</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setMode('google')}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-medium py-3 rounded-lg transition-all"
              >
                <Globe className="h-5 w-5" />
                Sign in with Google
              </button>

              <button
                onClick={() => setMode('email')}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-all"
              >
                <Mail className="h-5 w-5" />
                Sign in with Email
              </button>

              <button
                onClick={() => setMode('wallet')}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-all"
              >
                <WalletIcon className="h-5 w-5" />
                Sign in with Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Email signup/login form
  if (mode === 'email') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-slate-900/50 border border-indigo-500/20 rounded-2xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-white">{isSignup ? 'Create Account' : 'Sign In'}</h1>
              <p className="text-slate-400 text-sm">Using email and password</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleEmailAuth} className="space-y-4">
              {isSignup && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isSignup}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              )}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />

              <input
                type="password"
                placeholder="Password (min 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">I am a</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'hirer', label: 'Hirer' },
                    { value: 'freelancer', label: 'Freelancer' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setRole(opt.value)}
                      className={`py-2.5 rounded-lg font-medium transition-all ${
                        role === opt.value
                          ? 'bg-indigo-600 text-white border border-indigo-500'
                          : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-indigo-500/50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <ArrowRight className="h-4 w-4" />
                {loading ? 'Loading...' : isSignup ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <button
              onClick={() => setIsSignup(!isSignup)}
              className="w-full text-slate-400 hover:text-slate-300 text-sm transition-all"
            >
              {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>

            <button
              onClick={() => setMode(null)}
              className="w-full text-slate-400 hover:text-slate-300 text-sm transition-all"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Google login - just trigger and load
  if (mode === 'google') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="bg-white text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 disabled:opacity-50 flex items-center gap-2 mx-auto"
          >
            <Globe className="h-5 w-5" />
            {loading ? 'Signing in...' : 'Click to sign in with Google'}
          </button>
          <button
            onClick={() => setMode(null)}
            className="mt-4 text-slate-400 hover:text-slate-300 text-sm"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  // Wallet login
  if (mode === 'wallet') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-slate-900/50 border border-indigo-500/20 rounded-2xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-white">Sign in with Wallet</h1>
              {isConnected && walletAddress && (
                <p className="text-slate-400 text-sm">
                  Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </p>
              )}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {!isConnected ? (
              <div className="text-center text-slate-400">
                <p className="mb-4">Please connect your wallet using the button in the navbar</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Name (optional)</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">I am a</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'hirer', label: 'Hirer' },
                      { value: 'freelancer', label: 'Freelancer' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setRole(opt.value)}
                        className={`py-2.5 rounded-lg font-medium transition-all ${
                          role === opt.value
                            ? 'bg-indigo-600 text-white border border-indigo-500'
                            : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-indigo-500/50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleWalletLogin}
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  <ArrowRight className="h-4 w-4" />
                  {loading ? 'Loading...' : 'Continue to Dashboard'}
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setMode(null);
                disconnect();
              }}
              className="w-full text-slate-400 hover:text-slate-300 text-sm flex items-center justify-center gap-2 transition-all"
            >
              <LogOut className="h-4 w-4" />
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }
}

