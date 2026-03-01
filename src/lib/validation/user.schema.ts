import { z } from 'zod';

type T = (key: string, values?: Record<string, string | number>) => string;

function createPasswordValidation(t: T) {
  return z
    .string()
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
      .string()
      .min(2, t('minLength', { min: 2 }))
      .max(100, t('maxLength', { max: 100 })),
    username: z
      .string()
      .min(3, t('minLength', { min: 3 }))
      .max(30, t('maxLength', { max: 30 }))
      .regex(/^[a-zA-Z0-9_]+$/, t('usernameFormat')),
    email: z
      .string()
      .email(t('email'))
      .max(254, t('maxLength', { max: 254 })),
    password: createPasswordValidation(t),
    bio: z.string().max(300, t('maxLength', { max: 300 })).optional(),
    role: z.enum(['USER', 'ADMIN']),
    enabled: z.boolean(),
    accountNonLocked: z.boolean(),
  });
}

export function createUpdateUserSchema(t: T) {
  return z.object({
    name: z
      .string()
      .min(2, t('minLength', { min: 2 }))
      .max(100, t('maxLength', { max: 100 })),
    username: z
      .string()
      .min(3, t('minLength', { min: 3 }))
      .max(30, t('maxLength', { max: 30 }))
      .regex(/^[a-zA-Z0-9_]+$/, t('usernameFormat')),
    email: z
      .string()
      .email(t('email'))
      .max(254, t('maxLength', { max: 254 })),
    bio: z.string().max(300, t('maxLength', { max: 300 })).optional(),
    role: z.enum(['USER', 'ADMIN']),
    accountNonLocked: z.boolean(),
  });
}

export type CreateUserFormData = z.infer<ReturnType<typeof createCreateUserSchema>>;
export type UpdateUserFormData = z.infer<ReturnType<typeof createUpdateUserSchema>>;
