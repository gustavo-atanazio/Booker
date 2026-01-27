import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Form from './_components/Form';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

async function Signup() {
  const t = await getTranslations('signup');

  return (
    <main className='h-dvh max-h-dvh'>
      <section className='w-full h-full bg-background flex flex-col items-center justify-center px-6 py-8 overflow-y-auto'>
        <div className='max-w-lg w-full flex flex-col gap-8 md:gap-10 my-8'>
          <div className='flex justify-between items-start'>
            <h1 className='self-start font-bold text-6xl'>
              Booker
            </h1>

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
              <Form />
            </CardContent>

            <CardFooter>
              <p className='text-muted-foreground text-center text-sm'>
                {t('footer')}
              </p>
            </CardFooter>
          </Card>

          <div className='flex flex-col gap-0.5 text-center text-base font-medium md:text-lg'>
            <span>{t('hasAccount')}</span>

            <Link href='/login' className='text-muted-foreground underline'>
              {t('login')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Signup;
