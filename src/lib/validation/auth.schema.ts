import { z } from 'zod';

type T = (key: string, values?: Record<string, string | number>) => string;

function createPasswordValidation(t: T) {
  return z
    .string({ message: t('required') })
    .min(1, t('required'))
    .min(8, t('minLength', { min: 8 }))
    .max(100, t('maxLength', { max: 100 }))
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
      t('passwordStrength')
    );
}

export function createLoginSchema(t: T) {
  return z.object({
    usernameOrEmail: z
      .string({ message: t('required') })
      .min(1, t('required'))
      .min(3, t('minLength', { min: 3 }))
      .max(254, t('maxLength', { max: 254 })),
    password: z
      .string({ message: t('required') })
      .min(1, t('required'))
      .min(8, t('minLength', { min: 8 }))
      .max(100, t('maxLength', { max: 100 })),
  });
}

export function createRegisterSchema(t: T) {
  return z
    .object({
      name: z
        .string({ message: t('required') })
        .min(1, t('required'))
        .min(2, t('minLength', { min: 2 }))
        .max(100, t('maxLength', { max: 100 })),
      username: z
        .string({ message: t('required') })
        .min(1, t('required'))
        .min(3, t('minLength', { min: 3 }))
        .max(30, t('maxLength', { max: 30 }))
        .regex(/^[a-zA-Z0-9_]+$/, t('usernameFormat')),
      email: z
        .string({ message: t('required') })
        .min(1, t('required'))
        .email(t('email'))
        .max(254, t('maxLength', { max: 254 })),
      password: createPasswordValidation(t),
      confirmPassword: z
        .string({ message: t('required') })
        .min(1, t('required')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordMismatch'),
      path: ['confirmPassword'],
    });
}

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
