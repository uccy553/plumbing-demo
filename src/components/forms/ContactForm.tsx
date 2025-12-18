'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { Service } from '@/types';

// Form validation schema
const contactFormSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    email: z.string().email('Please enter a valid email address'),
    service: z.string().min(1, 'Please select a service'),
    preferredDate: z.string().optional(),
    preferredTime: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
    services: Service[];
}

export function ContactForm({ services }: ContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSubmitStatus('success');
                reset();
            } else {
                setSubmitStatus('error');
            }
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClassName = cn(
        'w-full px-4 py-3 rounded-lg',
        'border border-neutral-200',
        'text-neutral-900 bg-white',
        'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
        'transition-all duration-200',
        'placeholder:text-neutral-400'
    );

    const labelClassName = 'block text-sm font-medium text-neutral-700 mb-1.5';
    const errorClassName = 'text-sm text-emergency-600 mt-1';

    if (submitStatus === 'success') {
        return (
            <div className="text-center p-8 bg-green-50 rounded-2xl">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-heading font-bold text-green-800 mb-2">
                    Thank You!
                </h3>
                <p className="text-green-700 mb-4">
                    We've received your message and will get back to you within 24 hours.
                </p>
                <Button
                    variant="outline"
                    onClick={() => setSubmitStatus('idle')}
                >
                    Send Another Message
                </Button>
            </div>
        );
    }

    return (
        <form
            id="contact-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            {/* Name & Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className={labelClassName}>
                        Full Name <span className="text-emergency-500">*</span>
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="John Smith"
                        className={cn(inputClassName, errors.name && 'border-emergency-500')}
                        {...register('name')}
                    />
                    {errors.name && (
                        <p className={errorClassName}>{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="phone" className={labelClassName}>
                        Phone Number <span className="text-emergency-500">*</span>
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        placeholder="(813) 555-0123"
                        className={cn(inputClassName, errors.phone && 'border-emergency-500')}
                        {...register('phone')}
                    />
                    {errors.phone && (
                        <p className={errorClassName}>{errors.phone.message}</p>
                    )}
                </div>
            </div>

            {/* Email & Service Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="email" className={labelClassName}>
                        Email Address <span className="text-emergency-500">*</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className={cn(inputClassName, errors.email && 'border-emergency-500')}
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className={errorClassName}>{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="service" className={labelClassName}>
                        Service Needed <span className="text-emergency-500">*</span>
                    </label>
                    <select
                        id="service"
                        className={cn(inputClassName, errors.service && 'border-emergency-500')}
                        {...register('service')}
                    >
                        <option value="">Select a service...</option>
                        {services.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                        <option value="other">Other</option>
                    </select>
                    {errors.service && (
                        <p className={errorClassName}>{errors.service.message}</p>
                    )}
                </div>
            </div>

            {/* Date & Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="preferredDate" className={labelClassName}>
                        Preferred Date
                    </label>
                    <input
                        id="preferredDate"
                        type="date"
                        className={inputClassName}
                        {...register('preferredDate')}
                    />
                </div>

                <div>
                    <label htmlFor="preferredTime" className={labelClassName}>
                        Preferred Time
                    </label>
                    <select
                        id="preferredTime"
                        className={inputClassName}
                        {...register('preferredTime')}
                    >
                        <option value="">Select a time...</option>
                        <option value="morning">Morning (8am - 12pm)</option>
                        <option value="afternoon">Afternoon (12pm - 5pm)</option>
                        <option value="evening">Evening (5pm - 7pm)</option>
                        <option value="asap">ASAP / Emergency</option>
                    </select>
                </div>
            </div>

            {/* Message */}
            <div>
                <label htmlFor="message" className={labelClassName}>
                    Describe Your Issue <span className="text-emergency-500">*</span>
                </label>
                <textarea
                    id="message"
                    rows={4}
                    placeholder="Please describe your plumbing issue or what service you need..."
                    className={cn(inputClassName, 'resize-none', errors.message && 'border-emergency-500')}
                    {...register('message')}
                />
                {errors.message && (
                    <p className={errorClassName}>{errors.message.message}</p>
                )}
            </div>

            {/* Error Message */}
            {submitStatus === 'error' && (
                <div className="flex items-center gap-2 p-4 bg-emergency-50 text-emergency-700 rounded-lg">
                    <AlertCircle size={20} />
                    <p>Something went wrong. Please try again or call us directly.</p>
                </div>
            )}

            {/* Submit Button */}
            <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
                rightIcon={<Send size={18} />}
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>

            <p className="text-sm text-neutral-500 text-center">
                We typically respond within 2 hours during business hours.
            </p>
        </form>
    );
}
