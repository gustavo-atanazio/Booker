import { verifyAdmin } from '@/lib/dal';
import { getTranslations } from 'next-intl/server';
import { apiGet } from '@/services/api';
import { getAccessToken } from '@/lib/auth/cookies';
import Header from '@/components/Header';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import UsersTable from './_components/UsersTable';
import type { PageUserDTO } from '@/lib/types/user.types';

type SearchParams = Promise<{ page?: string }>;

export default async function AdminUsersPage(props: {
  searchParams: SearchParams;
}) {
  await verifyAdmin();
  const t = await getTranslations('adminUsers');
  const searchParams = await props.searchParams;
  const page = Math.max(0, parseInt(searchParams.page ?? '0', 10) || 0);

  const token = await getAccessToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  const response = await apiGet<PageUserDTO>(
    `/users?page=${page}&size=10&sort=createdAt,DESC`,
    { headers }
  );
  const initialData = response.success && response.data ? response.data : null;

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 container mx-auto px-4 py-8'>
        <div className='space-y-6'>
          <div className='flex items-center gap-4'>
            <Button asChild variant='ghost' size='sm'>
              <Link href='/admin'>
                <ChevronLeft className='mr-1 h-4 w-4' />
                {t('backToDashboard')}
              </Link>
            </Button>
          </div>

          <div>
            <h1 className='text-3xl font-bold'>{t('title')}</h1>
            <p className='text-muted-foreground mt-1'>{t('description')}</p>
          </div>

          <UsersTable initialData={initialData} initialPage={page} />
        </div>
      </main>
    </div>
  );
}
