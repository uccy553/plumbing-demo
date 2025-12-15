import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getData, getServices, getServiceById } from '@/lib/data';
import { ServicePageClient } from '@/components/pages/ServicePageClient';

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate static params for all services
export async function generateStaticParams() {
    const services = await getServices();
    return services.map((service) => ({
        slug: service.id,
    }));
}

// Generate metadata for each service page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = await getServiceById(slug);

    if (!service) {
        return {
            title: 'Service Not Found',
        };
    }

    const data = await getData();

    return {
        title: `${service.name} | ${data.businessInfo.name}`,
        description: service.shortDescription,
        openGraph: {
            title: `${service.name} | ${data.businessInfo.name}`,
            description: service.shortDescription,
        },
    };
}

export default async function ServicePage({ params }: PageProps) {
    const { slug } = await params;
    const data = await getData();
    const service = await getServiceById(slug);

    if (!service) {
        notFound();
    }

    return <ServicePageClient data={data} service={service} />;
}
