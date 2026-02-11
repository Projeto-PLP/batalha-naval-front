// Layout do Dashboard - AuthGuard + Sidebar + UserMenu
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/utils';
import { useUserProfile } from '@/hooks/queries/useUserProfile';
import { useAuth } from '@/providers/AuthProvider';
import { UserMenu } from '@/components/ui/UserMenu';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const {logout} = useAuth();

  const { data: user } = useUserProfile();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-naval-bg">
      {/* Header */}
      <header className="bg-naval-surface text-white shadow-lg border-b border-naval-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo - Clickable */}
          <Link href="/lobby" className="hover:opacity-80 transition-opacity">
            <h1 className="text-2xl font-bold cursor-pointer">⚓ Batalha Naval</h1>
          </Link>
          
          {/* User Menu Dropdown */}
          <div className="flex items-center">
            {user && <UserMenu user={user} onLogout={handleLogout} />}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
