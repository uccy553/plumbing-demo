'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    className?: string;
}

const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-4xl',
};

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    className,
}: ModalProps) {
    // Handle escape key
    const handleEscape = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        },
        [onClose]
    );

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, handleEscape]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className={cn(
                            'relative w-full',
                            'bg-white rounded-2xl shadow-elevated',
                            'max-h-[90vh] overflow-y-auto',
                            sizeStyles[size],
                            className
                        )}
                    >
                        {/* Header */}
                        {title && (
                            <div className="sticky top-0 flex items-center justify-between p-6 pb-4 bg-white border-b border-neutral-100 rounded-t-2xl">
                                <h2 className="text-xl font-heading font-bold text-primary-900">
                                    {title}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
                                    aria-label="Close modal"
                                >
                                    <X size={20} className="text-neutral-500" />
                                </button>
                            </div>
                        )}

                        {/* Close button if no title */}
                        {!title && (
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 transition-colors z-10"
                                aria-label="Close modal"
                            >
                                <X size={20} className="text-neutral-500" />
                            </button>
                        )}

                        {/* Content */}
                        <div className={cn('p-6', title && 'pt-4')}>{children}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
