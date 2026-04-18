'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useIPFS } from '@/hooks/useIPFS';
import { User, FileText, Briefcase, DollarSign } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  skills: z.string().transform((v) => v.split(',').map((s) => s.trim()).filter(Boolean)),
  hourly_rate: z.string(),
  role: z.enum(['client', 'freelancer', 'both']),
});

type FormValues = z.infer<typeof schema>;

export function ProfileSetup() {
  const { address } = useAccount();
  const { profile, fetchProfile, updateProfile, createProfile } = useUserProfile();
  const { uploadText } = useIPFS();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: 'both',
    },
  });

  useEffect(() => {
    if (address) {
      fetchProfile(address).then((prof) => {
        if (prof) {
          setValue('name', prof.name);
          setValue('bio', prof.bio);
          setValue('skills', prof.skills.join(', '));
          setValue('hourly_rate', prof.hourly_rate);
          setValue('role', prof.role);
        }
      });
    }
  }, [address, fetchProfile, setValue]);

  const onSubmit = async (data: FormValues) => {
    if (!address) return;
    setIsSubmitting(true);
    try {
      const profileData = {
        name: data.name,
        bio: data.bio,
        skills: data.skills,
        hourly_rate: data.hourly_rate,
        role: data.role,
      };

      if (profile?.id === address.toLowerCase()) {
        await updateProfile(profileData);
      } else {
        await createProfile({
          ...profileData,
          rating: 0,
          total_jobs_completed: 0,
          total_earned: '0',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <User className="h-5 w-5 text-indigo-400" />
          Setup Your Profile
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Complete your profile so clients/freelancers can find and trust you.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <input
            {...register('name')}
            placeholder="Your full name"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
        </div>

        {/* Role */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Role</label>
          <select
            {...register('role')}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          >
            <option value="client">Client</option>
            <option value="freelancer">Freelancer</option>
            <option value="both">Both</option>
          </select>
          {errors.role && <p className="text-xs text-red-400">{errors.role.message}</p>}
        </div>

        {/* Bio */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-indigo-400" />
            Bio
          </label>
          <textarea
            {...register('bio')}
            rows={3}
            placeholder="Tell us about yourself, your experience, and expertise…"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
          />
          {errors.bio && <p className="text-xs text-red-400">{errors.bio.message}</p>}
        </div>

        {/* Skills */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 text-indigo-400" />
            Skills (comma-separated)
          </label>
          <input
            {...register('skills')}
            placeholder="React, Node.js, Solidity, Design, etc."
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          {errors.skills && <p className="text-xs text-red-400">{errors.skills.message}</p>}
        </div>

        {/* Hourly Rate */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-indigo-400" />
            Hourly Rate (USD)
          </label>
          <input
            {...register('hourly_rate')}
            type="number"
            min="0"
            step="0.01"
            placeholder="50"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          {errors.hourly_rate && (
            <p className="text-xs text-red-400">{errors.hourly_rate.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 px-4 py-2.5 text-sm font-medium text-white transition-all"
        >
          {isSubmitting ? 'Saving...' : profile ? 'Update Profile' : 'Create Profile'}
        </button>
      </form>
    </div>
  );
}
