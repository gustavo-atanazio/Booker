import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { BookOpen, Sparkles, Users } from 'lucide-react';

export default async function Home() {
  const t = await getTranslations('landing');

  return (
    <div className='min-h-screen flex flex-col'>
      <header className='border-b'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Booker</h1>
          <div className='flex items-center gap-2'>
            <LanguageSwitcher />
            <ThemeToggle />
            <Button variant='ghost' asChild>
              <Link href='/login'>{t('hero.login')}</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className='flex-1 container mx-auto px-4 py-16 md:py-24'>
        <div className='max-w-4xl mx-auto text-center space-y-8'>
          <div className='space-y-4'>
            <h2 className='text-4xl md:text-6xl font-bold tracking-tight'>
              {t('hero.title')} <span className='text-primary'>Booker</span>
            </h2>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              {t('hero.subtitle')}
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button size='lg' className='w-full sm:w-auto' asChild>
              <Link href='/signup'>{t('hero.cta')}</Link>
            </Button>
            <Button size='lg' variant='outline' className='w-full sm:w-auto' asChild>
              <Link href='/login'>{t('hero.login')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className='bg-muted/50 py-16 md:py-24'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto space-y-12'>
            <div className='text-center space-y-4'>
              <h3 className='text-3xl md:text-4xl font-bold'>
                {t('features.title')}
              </h3>
              <p className='text-lg text-muted-foreground'>
                {t('features.subtitle')}
              </p>
            </div>

            <div className='grid md:grid-cols-3 gap-6'>
              <Card>
                <CardHeader>
                  <div className='w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4'>
                    <BookOpen className='w-6 h-6 text-primary' />
                  </div>
                  <CardTitle>{t('features.items.rate.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-base'>
                    {t('features.items.rate.description')}
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4'>
                    <Sparkles className='w-6 h-6 text-primary' />
                  </div>
                  <CardTitle>{t('features.items.discover.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-base'>
                    {t('features.items.discover.description')}
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className='w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4'>
                    <Users className='w-6 h-6 text-primary' />
                  </div>
                  <CardTitle>{t('features.items.share.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-base'>
                    {t('features.items.share.description')}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 md:py-24'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto text-center space-y-8'>
            <div className='space-y-4'>
              <h3 className='text-3xl md:text-4xl font-bold'>
                {t('cta.title')}
              </h3>
              <p className='text-lg text-muted-foreground'>
                {t('cta.subtitle')}
              </p>
            </div>
            <Button size='lg' className='w-full sm:w-auto' asChild>
              <Link href='/signup'>{t('cta.button')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className='border-t py-8'>
        <div className='container mx-auto px-4 text-center text-sm text-muted-foreground'>
          &copy; {new Date().getFullYear()} Booker. {t('footer.rights')}
        </div>
      </footer>
    </div>
  );
}
