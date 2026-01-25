'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

function Form() {
  const t = useTranslations('signup');
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePassword = (password: string): boolean => {
    // Strong password: min 1 uppercase, 1 lowercase, 1 digit, 1 special char
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/;
    return strongPasswordRegex.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!validatePassword(formData.password)) {
      newErrors.password = t('validation.weakPassword');
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('validation.passwordMismatch');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const registerDTO = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password
    };

    // TODO: Send to API POST /api/auth/register
    console.log('Register DTO:', registerDTO);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {/* Name */}
      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='name'>{t('name')}</Label>
        <Input
          id='name'
          name='name'
          placeholder={t('namePlaceholder')}
          type='text'
          value={formData.name}
          onChange={handleChange}
          minLength={2}
          maxLength={100}
          required
        />
      </div>

      {/* Username */}
      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='username'>{t('username')}</Label>
        <Input
          id='username'
          name='username'
          placeholder={t('usernamePlaceholder')}
          type='text'
          value={formData.username}
          onChange={handleChange}
          minLength={3}
          maxLength={30}
          required
        />
      </div>

      {/* Email */}
      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='email'>{t('email')}</Label>
        <Input
          id='email'
          name='email'
          placeholder={t('emailPlaceholder')}
          type='email'
          value={formData.email}
          onChange={handleChange}
          maxLength={254}
          required
        />
      </div>

      {/* Password */}
      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='password'>{t('password')}</Label>
        <Input
          id='password'
          name='password'
          placeholder={t('passwordPlaceholder')}
          type='password'
          value={formData.password}
          onChange={handleChange}
          minLength={8}
          maxLength={100}
          required
        />
        {errors.password && (
          <p className='text-sm text-destructive'>{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='confirmPassword'>{t('confirmPassword')}</Label>
        <Input
          id='confirmPassword'
          name='confirmPassword'
          placeholder={t('confirmPasswordPlaceholder')}
          type='password'
          value={formData.confirmPassword}
          onChange={handleChange}
          minLength={8}
          maxLength={100}
          required
        />
        {errors.confirmPassword && (
          <p className='text-sm text-destructive'>{errors.confirmPassword}</p>
        )}
      </div>

      <Button className='w-full mt-6' type='submit'>
        {t('submit')}
      </Button>
    </form>
  );
}

export default Form;
