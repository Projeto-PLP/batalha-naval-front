/**
 * UserMenu Component - Dropdown menu for user actions
 * 
 * Displays user info and a dropdown menu with profile and logout options.
 * Follows Naval Design System aesthetic.
 */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { UserDetails } from '@/types/api-responses';

interface UserMenuProps {
  user: UserDetails;
  onLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      {/* User Info Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
          "hover:bg-naval-action/20 focus:outline-none focus:ring-2 focus:ring-naval-action",
          isOpen && "bg-naval-action/20"
        )}
      >
        {/* Avatar Circle */}
        <div className="w-8 h-8 rounded-full bg-naval-action/30 border-2 border-naval-action flex items-center justify-center">
          <span className="text-sm font-bold text-naval-action">
            {user.username.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* User Info */}
        <div className="text-left">
          <div className="font-semibold text-white text-sm">{user.username}</div>
          <div className="text-xs text-naval-text-secondary">
            {user.wins}V - {user.losses}D
          </div>
        </div>

        {/* Dropdown Arrow */}
        <svg
          className={cn(
            "w-4 h-4 text-naval-text-secondary transition-transform",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-naval-surface border border-naval-border z-50">
          <div className="py-1">
            {/* Profile Option */}
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-naval-action/20 transition-colors"
            >
              <div>
                <div className="font-medium">Meu Perfil</div>
                <div className="text-xs text-naval-text-muted">Ver estatísticas completas</div>
              </div>
            </Link>

            {/* Divider */}
            <div className="h-px bg-naval-border my-1" />

            {/* Logout Option */}
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white hover:bg-naval-error/20 hover:text-naval-error transition-colors"
            >
              <div className="text-left">
                <div className="font-medium">Sair</div>
                <div className="text-xs text-naval-text-muted">Encerrar sessão</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
