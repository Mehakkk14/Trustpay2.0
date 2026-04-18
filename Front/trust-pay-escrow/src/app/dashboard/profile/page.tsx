'use client';

import { useState, useEffect, useRef } from 'react';
import { useAccount } from 'wagmi';
import { useIPFS } from '@/hooks/useIPFS';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { shortenAddress } from '@/lib/utils';
import { User, Camera, Save, Wallet, Plus, X } from 'lucide-react';
import type { UserProfile } from '@/types';

const DEFAULT_PROFILE: UserProfile = {
  address: '',
  name: '',
  bio: '',
  skills: [],
  hourlyRate: '',
  profileImageCID: '',
  profileImageUrl: '',
  joinedAt: new Date().toISOString(),
};

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const { uploadFile, getIPFSUrl, isUploading } = useIPFS();
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [skill, setSkill] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load profile from localStorage
  useEffect(() => {
    if (!address) return;
    const stored = localStorage.getItem(`trust-pay-profile-${address}`);
    if (stored) {
      setProfile(JSON.parse(stored));
    } else {
      setProfile({ ...DEFAULT_PROFILE, address, joinedAt: new Date().toISOString() });
    }
  }, [address]);

  const save = async () => {
    if (!address) return;
    setIsSaving(true);
    const updated = { ...profile, address };
    localStorage.setItem(`trust-pay-profile-${address}`, JSON.stringify(updated));
    await new Promise((r) => setTimeout(r, 600)); // simulate network
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const cid = await uploadFile(file);
    if (cid) {
      const url = getIPFSUrl(cid);
      setProfile((p) => ({ ...p, profileImageCID: cid, profileImageUrl: url }));
    }
  };

  const addSkill = () => {
    const s = skill.trim();
    if (s && !profile.skills.includes(s)) {
      setProfile((p) => ({ ...p, skills: [...p.skills, s] }));
    }
    setSkill('');
  };

  const removeSkill = (s: string) => {
    setProfile((p) => ({ ...p, skills: p.skills.filter((sk) => sk !== s) }));
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-5 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
          <Wallet className="h-8 w-8 text-indigo-400" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Connect Your Wallet</h2>
        <p className="text-muted-foreground max-w-sm">
          Connect your wallet to view and edit your Trust Pay profile.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-foreground flex items-center gap-2">
          <User className="h-7 w-7 text-indigo-400" />
          My Profile
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Your public freelancer profile. Stored in your browser (or IPFS for images).
        </p>
      </div>

      {/* Avatar + Wallet */}
      <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="relative">
          <div className="h-20 w-20 rounded-2xl overflow-hidden border-2 border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center">
            {profile.profileImageUrl ? (
              <img src={profile.profileImageUrl} alt="avatar" className="h-full w-full object-cover" />
            ) : (
              <User className="h-10 w-10 text-indigo-400" />
            )}
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-500 border-2 border-background transition-all"
          >
            {isUploading ? <LoadingSpinner size="sm" /> : <Camera className="h-3.5 w-3.5 text-white" />}
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </div>
        <div>
          <p className="font-semibold text-foreground">{profile.name || 'Unnamed Freelancer'}</p>
          <p className="text-sm font-mono text-indigo-400">{shortenAddress(address || '', 6)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Member since {new Date(profile.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-5">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Full Name / Handle</label>
          <input
            value={profile.name}
            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
            placeholder="e.g. Alex Dev"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        {/* Bio */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
            rows={4}
            placeholder="Describe your expertise, experience, and what you love to build…"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
          />
        </div>

        {/* Hourly Rate */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Hourly Rate (ETH)</label>
          <input
            value={profile.hourlyRate}
            onChange={(e) => setProfile((p) => ({ ...p, hourlyRate: e.target.value }))}
            type="number"
            step="0.001"
            min="0"
            placeholder="0.02"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Skills</label>
          <div className="flex gap-2">
            <input
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              placeholder="e.g. Solidity, React, TypeScript"
              className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
            <button
              onClick={addSkill}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-all"
            >
              <Plus className="h-4 w-4 text-white" />
            </button>
          </div>
          {profile.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.skills.map((s) => (
                <span
                  key={s}
                  className="flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs text-indigo-400"
                >
                  {s}
                  <button onClick={() => removeSkill(s)} className="hover:text-red-400 transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Save */}
        {saved && (
          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-sm text-emerald-400">
            ✅ Profile saved successfully!
          </div>
        )}
        <button
          onClick={save}
          disabled={isSaving}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200"
        >
          {isSaving ? <LoadingSpinner size="sm" /> : <Save className="h-4 w-4" />}
          {isSaving ? 'Saving…' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
}
