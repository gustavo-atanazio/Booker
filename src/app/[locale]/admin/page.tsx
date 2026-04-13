import { verifyAdmin } from '@/lib/dal';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { Users, BookOpen, Tags } from 'lucide-react';

export default async function AdminPage() {
  const user = await verifyAdmin();
  const t = await getTranslations('admin');

  const cards = [
    { key: 'users', icon: Users, href: '/admin/users' },
    { key: 'books', icon: BookOpen, href: '/admin/books' },
    { key: 'catalog', icon: Tags, href: '/admin/catalog' },
  ] as const;

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 container mx-auto px-4 py-8'>
        <div className='space-y-8'>
          <div>
            <h1 className='text-3xl font-bold'>{t('title')}</h1>
            <p className='text-muted-foreground mt-1'>
              {t('welcome', { name: user.name })}
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {cards.map(({ key, icon: Icon, href }) => (
              <Card key={key} className='flex flex-col'>
                <CardHeader>
                  <div className='flex items-center gap-3 mb-1'>
                    <Icon className='h-5 w-5 text-muted-foreground' />
                    <CardTitle>{t(`cards.${key}.title`)}</CardTitle>
                  </div>
                  <CardDescription>
                    {t(`cards.${key}.description`)}
                  </CardDescription>
                </CardHeader>
                <CardFooter className='mt-auto pt-0'>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href={href}>{t(`cards.${key}.manage`)}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
