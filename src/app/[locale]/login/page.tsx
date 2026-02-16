import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Form from './_components/Form';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

type SearchParams = Promise<{ redirect?: string }>;

export default async function Login(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const t = await getTranslations('login');

  return (
    <main className='h-dvh max-h-dvh'>
      <section className='w-full min-h-full bg-background flex flex-col items-center justify-center p-6'>
        <div className='max-w-lg flex flex-col gap-8 md:gap-10'>
          <div className='flex justify-between'>
            <Link className='self-start font-bold text-4xl md:text-6xl' href='/'>
              Booker
            </Link>

            <div className='self-end flex gap-2'>
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>

          <Card className='w-full'>
            <CardHeader>
              <CardTitle className='text-2xl font-bold tracking-tighter'>
                {t('title')}
              </CardTitle>

              <CardDescription className='!mt-0'>
                {t('subtitle')}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form redirectTo={searchParams.redirect} />
            </CardContent>

            <CardFooter>
              <p className='text-muted-foreground text-center text-sm'>
                {t('footer')}
              </p>
            </CardFooter>
          </Card>

          <div className='flex flex-col gap-0.5 text-center text-base font-medium md:text-lg'>
            <span>{t('noAccount')}</span>

            <Link href='/signup' className='text-muted-foreground underline'>
              {t('signup')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
