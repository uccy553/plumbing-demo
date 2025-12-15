import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Contact form validation schema
const contactFormSchema = z.object({
    name: z.string().min(2),
    phone: z.string().min(10),
    email: z.string().email(),
    service: z.string().min(1),
    preferredDate: z.string().optional(),
    preferredTime: z.string().optional(),
    message: z.string().min(10),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate the request body
        const validatedData = contactFormSchema.parse(body);

        // Log the submission (for development)
        console.log('Contact form submission:', validatedData);

        // Here you would typically:
        // 1. Send an email notification using a service like Resend, SendGrid, etc.
        // 2. Save to a database
        // 3. Send a confirmation email to the user

        // Example with Resend (uncomment when configured):
        /*
        import { Resend } from 'resend';
        
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          from: 'Joshua Tree Plumbing <noreply@joshuatreeplumbing.com>',
          to: ['joshwille81@gmail.com'],
          subject: `New Contact Form Submission - ${validatedData.service}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Phone:</strong> ${validatedData.phone}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Service:</strong> ${validatedData.service}</p>
            <p><strong>Preferred Date:</strong> ${validatedData.preferredDate || 'Not specified'}</p>
            <p><strong>Preferred Time:</strong> ${validatedData.preferredTime || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${validatedData.message}</p>
          `,
        });
        */

        return NextResponse.json(
            {
                success: true,
                message: 'Thank you for your message. We will get back to you soon!'
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid form data',
                    errors: error.issues
                },
                { status: 400 }
            );
        }

        console.error('Contact form error:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred. Please try again.'
            },
            { status: 500 }
        );
    }
}
