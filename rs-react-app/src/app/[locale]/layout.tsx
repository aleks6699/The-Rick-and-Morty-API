import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '../components/header/Header';

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <div
      className="
  min-h-screen
  bg-gradient-to-br
  from-gray-900 to-gray-800
  light:from-gray-100 light:to-white
  text-white light:text-gray-900
  transition-colors duration-300
  p-4 md:p-8"
    >
      <Header />
      {children}
    </div>
  );
}
