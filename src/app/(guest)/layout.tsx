import '@sangpencerah/styles/globals.css';
import { Metadata } from 'next';

import { siteConfig } from '@sangpencerah/config/site';
import SiteHeader from '@sangpencerah/components/site-header';

// export const metadata: Metadata = {
//     title: {
//         default: siteConfig.name,
//         template: `%s - ${siteConfig.name}`,
//     },
//     description: siteConfig.description,
//     themeColor: [
//         { media: '(prefers-color-scheme: light)', color: 'white' },
//         { media: '(prefers-color-scheme: dark)', color: 'black' },
//     ],
//     icons: {
//         icon: '/favicon.ico',
//         shortcut: '/favicon-16x16.png',
//         apple: '/apple-touch-icon.png',
//     },
// };

interface RootLayoutProps {
    children: React.ReactNode;
}

export default async function GuestLayout({ children }: RootLayoutProps) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
        </div>
    );
}
