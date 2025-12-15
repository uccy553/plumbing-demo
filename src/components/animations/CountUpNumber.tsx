'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CountUpNumberProps {
    end: number;
    start?: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    separator?: string;
    className?: string;
    once?: boolean;
}

export function CountUpNumber({
    end,
    start = 0,
    duration = 2000,
    prefix = '',
    suffix = '',
    decimals = 0,
    separator = ',',
    className,
    once = true,
}: CountUpNumberProps) {
    const [count, setCount] = useState(start);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once, margin: '-50px' });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isInView) return;
        if (once && hasAnimated.current) return;

        hasAnimated.current = true;

        const startTime = performance.now();
        const difference = end - start;

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            const currentValue = start + difference * easedProgress;
            setCount(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, start, end, duration, once]);

    // Format number with separator
    const formatNumber = (num: number): string => {
        const fixed = num.toFixed(decimals);
        const parts = fixed.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        return parts.join('.');
    };

    return (
        <span ref={ref} className={cn('tabular-nums', className)}>
            {prefix}
            {formatNumber(count)}
            {suffix}
        </span>
    );
}

// Animated stat with label
interface AnimatedStatProps {
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
    className?: string;
}

export function AnimatedStat({
    value,
    label,
    prefix = '',
    suffix = '',
    className,
}: AnimatedStatProps) {
    return (
        <div className={cn('text-center', className)}>
            <div className="text-4xl md:text-5xl font-bold font-heading text-primary-900">
                <CountUpNumber end={value} prefix={prefix} suffix={suffix} />
            </div>
            <div className="mt-2 text-neutral-600">{label}</div>
        </div>
    );
}
