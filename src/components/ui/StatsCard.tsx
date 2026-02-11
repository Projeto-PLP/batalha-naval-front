/**
 * StatsCard Component - Naval Design System
 * 
 * Card component for displaying player statistics with icon, label, and value.
 * Follows the naval design aesthetic with naval-surface background.
 */
'use client';

import * as React from 'react';
import { Card, CardContent } from './Card';
import { cn } from '@/lib/utils';

export interface StatsCardProps {
  /** Icon or emoji to display */
  icon: string;
  /** Label describing the statistic */
  label: string;
  /** Numeric value of the statistic */
  value: number | string;
  /** Optional subtitle for additional context */
  subtitle?: string;
  /** Optional className for custom styling */
  className?: string;
  /** Highlight variant for special emphasis */
  variant?: 'default' | 'primary' | 'success' | 'warning';
}

/**
 * StatsCard - Displays a single statistic with visual prominence
 */
export const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  label,
  value,
  subtitle,
  className,
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'border-naval-border',
    primary: 'border-naval-action/50 bg-naval-action/5',
    success: 'border-green-500/50 bg-green-500/5',
    warning: 'border-yellow-500/50 bg-yellow-500/5',
  };

  return (
    <Card className={cn('transition-all hover:scale-105', variantClasses[variant], className)}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="text-4xl flex-shrink-0">{icon}</div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-naval-text-secondary uppercase tracking-wide">
              {label}
            </p>
            <p className="text-3xl font-bold text-white mt-1 truncate">
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-naval-text-muted mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
