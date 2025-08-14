import { MainContent } from '../components/mainContent/MainContent';

export default async function HomePage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ search?: string; page?: string }>;
}>) {
  const params = await searchParams;
  return <MainContent searchParams={params} />;
}
