import { verifyAdmin } from '@/lib/dal';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';

export default async function AdminPage() {
  const user = await verifyAdmin();
  const t = await getTranslations('admin');

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 container mx-auto px-4 py-8'>
        <div className='max-w-md mx-auto space-y-6'>
          <h1 className='text-3xl font-bold'>{t('title')}</h1>
          <p className='text-muted-foreground'>
            {t('welcome', { name: user.name })}
          </p>
        </div>
      </main>
    </div>
  );
}
