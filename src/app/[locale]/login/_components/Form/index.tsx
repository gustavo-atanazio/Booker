'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';

function Form() {
  const t = useTranslations('login');

  return (
    <form>
      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='email'>{t('email')}</Label>
        <Input
          id='email'
          placeholder={t('emailPlaceholder')}
          type='email'
          required
        />
      </div>

      <div className='flex flex-col gap-1.5 mt-4'>
        <Label htmlFor='password'>{t('password')}</Label>
        <Input
          id='password'
          placeholder='********'
          type='password'
          required
        />
      </div>

      <Button className='mt-6 w-full' type='submit'>
        {t('submit')}
      </Button>
    </form>
  );
}

export default Form;
