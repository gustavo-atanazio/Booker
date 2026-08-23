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

export function createCreateUserSchema(t: T) {
  return z.object({
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
    bio: z.string().max(300, t('maxLength', { max: 300 })).optional(),
    role: z.enum(['USER', 'ADMIN'], { message: t('required') }),
    enabled: z.boolean({ message: t('required') }),
    accountNonLocked: z.boolean({ message: t('required') }),
  });
}

export function createUpdateUserSchema(t: T) {
  return z.object({
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
    bio: z.string().max(300, t('maxLength', { max: 300 })).optional(),
    role: z.enum(['USER', 'ADMIN'], { message: t('required') }),
    accountNonLocked: z.boolean({ message: t('required') }),
  });
}

export type CreateUserFormData = z.infer<ReturnType<typeof createCreateUserSchema>>;
export type UpdateUserFormData = z.infer<ReturnType<typeof createUpdateUserSchema>>;
