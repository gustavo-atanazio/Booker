import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ModeToggle from '@/components/ModeToggle';
import Form from './_components/Form';

function Login() {
  return (
    <main className='h-dvh max-h-dvh'>
      <section className='w-full h-full bg-background flex flex-col items-center justify-center px-6'>
        <div className='max-w-lg flex flex-col gap-8 md:gap-10'>
          <div className='flex justify-between'>
            <h1 className='self-start font-bold text-6xl'>
              Booker
            </h1>

            <div className='self-end'>
              <ModeToggle/>
            </div>
          </div>

          <Card className='w-full'>
            <CardHeader>
              <CardTitle className='text-2xl font-bold tracking-tighter'>
                Entre com sua conta
              </CardTitle>

              <CardDescription className='!mt-0'>
                Utilize seu e-mail e senha
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form/>
            </CardContent>

            <CardFooter>
              <p className='text-muted-foreground text-center text-sm'>
                Ao entrar em nossa plataforma, você concorda com nossos Termos
                de Uso e Política de Privacidade.
              </p>
            </CardFooter>
          </Card>

          <div className='flex flex-col gap-0.5 text-center text-base font-medium md:text-lg'>
            <span>Ainda não tem uma conta?</span>

            <Link href='/signup' className='text-muted-foreground underline'>
              Cadastre-se
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;