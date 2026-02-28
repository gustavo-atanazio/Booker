import { verifySession } from '@/lib/dal';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';

export default async function DashboardPage() {
  const user = await verifySession();
  const t = await getTranslations('dashboard');

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 container mx-auto px-4 py-8'>
        <div className='max-w-md mx-auto space-y-6'>
          <h1 className='text-3xl font-bold'>{t('title')}</h1>
          <p className='text-muted-foreground'>
            {t('welcome', { name: user.name })}
          </p>

          <div className='p-6 rounded-lg border bg-card text-card-foreground shadow-sm'>
            <h2 className='text-lg font-semibold mb-4'>{t('userInfo')}</h2>
            <dl className='space-y-2 text-sm'>
              <div className='flex justify-between'>
                <dt className='text-muted-foreground'>{t('username')}</dt>
                <dd className='font-medium'>@{user.username}</dd>
              </div>
              <div className='flex justify-between'>
                <dt className='text-muted-foreground'>{t('email')}</dt>
                <dd className='font-medium'>{user.email}</dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}
