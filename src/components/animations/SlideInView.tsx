'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

type Direction = 'left' | 'right' | 'up' | 'down';

interface SlideInViewProps {
    children: React.ReactNode;
    direction?: Direction;
    delay?: number;
    duration?: number;
    distance?: number;
    className?: string;
    once?: boolean;
}

export function SlideInView({
    children,
    direction = 'left',
    delay = 0,
    duration = 0.6,
    distance = 50,
    className,
    once = true,
}: SlideInViewProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: '-50px' });

    const getInitialPosition = () => {
        switch (direction) {
            case 'left':
                return { x: -distance, y: 0 };
            case 'right':
                return { x: distance, y: 0 };
            case 'up':
                return { x: 0, y: distance };
            case 'down':
                return { x: 0, y: -distance };
            default:
                return { x: 0, y: 0 };
        }
    };

    const initial = getInitialPosition();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...initial }}
            animate={
                isInView
                    ? { opacity: 1, x: 0, y: 0 }
                    : { opacity: 0, ...initial }
            }
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}

// Slide In with Scale
interface SlideInScaleProps {
    children: React.ReactNode;
    direction?: Direction;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
}

export function SlideInScale({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    className,
    once = true,
}: SlideInScaleProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: '-50px' });

    const getY = () => {
        if (direction === 'up') return 30;
        if (direction === 'down') return -30;
        return 0;
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: getY(), scale: 0.95 }}
            animate={
                isInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: getY(), scale: 0.95 }
            }
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
