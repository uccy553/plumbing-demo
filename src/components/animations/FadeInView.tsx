'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FadeInViewProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
    direction?: 'up' | 'down' | 'none';
    distance?: number;
}

export function FadeInView({
    children,
    delay = 0,
    duration = 0.6,
    className,
    once = true,
    direction = 'up',
    distance = 20,
}: FadeInViewProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: '-50px' });

    const getInitialY = () => {
        if (direction === 'up') return distance;
        if (direction === 'down') return -distance;
        return 0;
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: getInitialY() }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: getInitialY() }}
            transition={{
                duration,
                delay,
                ease: 'easeOut',
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}

// Stagger container for animating children
interface StaggerContainerProps {
    children: React.ReactNode;
    staggerDelay?: number;
    className?: string;
    once?: boolean;
}

export function StaggerContainer({
    children,
    staggerDelay = 0.1,
    className,
    once = true,
}: StaggerContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}

// Child item for stagger animation
interface StaggerItemProps {
    children: React.ReactNode;
    className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}
