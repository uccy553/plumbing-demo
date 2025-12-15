'use client';

import { cn } from '@/lib/utils';
import {
    Shield,
    ShieldCheck,
    Award,
    CheckCircle,
    Clock,
    Star,
    type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
    shield: Shield,
    'shield-check': ShieldCheck,
    award: Award,
    'check-circle': CheckCircle,
    clock: Clock,
    star: Star,
};

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'trust' | 'certification' | 'promo' | 'emergency';
    size?: 'sm' | 'md' | 'lg';
    icon?: string;
    className?: string;
}

const variantStyles = {
    default: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    trust: 'bg-primary-100 text-primary-900 border-primary-200',
    certification: 'bg-accent-100 text-accent-900 border-accent-200',
    promo: 'bg-secondary-100 text-secondary-900 border-secondary-200',
    emergency: 'bg-emergency-100 text-emergency-900 border-emergency-200',
};

const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
};

const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
};

export function Badge({
    children,
    variant = 'default',
    size = 'md',
    icon,
    className,
}: BadgeProps) {
    const IconComponent = icon ? iconMap[icon] : null;

    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5',
                'font-medium rounded-full',
                'border',
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
        >
            {IconComponent && <IconComponent size={iconSizes[size]} />}
            {children}
        </span>
    );
}

// Star rating component
interface StarRatingProps {
    rating: number;
    maxRating?: number;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const starSizes = {
    sm: 14,
    md: 18,
    lg: 22,
};

export function StarRating({
    rating,
    maxRating = 5,
    size = 'md',
    className,
}: StarRatingProps) {
    return (
        <div className={cn('flex items-center gap-0.5', className)}>
            {Array.from({ length: maxRating }).map((_, index) => (
                <Star
                    key={index}
                    size={starSizes[size]}
                    className={cn(
                        index < rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-neutral-300'
                    )}
                />
            ))}
        </div>
    );
}
