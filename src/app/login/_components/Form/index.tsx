import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function Form() {
  return (
    <form>
      <div className='flex flex-col gap-1.5'>
        <Label htmlFor='email'>E-mail</Label>
        <Input
          id='email'
          placeholder='exemplo@email.com'
          type='email'
          required
        />
      </div>

      <div className='flex flex-col gap-1.5 mt-4'>
        <Label htmlFor='password'>Senha</Label>
        <Input
          id='password'
          placeholder='********'
          type='password'
          required
        />
      </div>

      <Button className='mt-6 w-full' type='submit'>
        Entrar
      </Button>
    </form>
  );
}

export default Form;