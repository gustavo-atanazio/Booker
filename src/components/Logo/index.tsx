import Image from 'next/image';

const bookerLogo = '/booker-logo.png';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
};

function Logo({ size = 'md' }: LogoProps) {
  const heights: Record<string, string> = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-12 w-12'
  };
  const textSizes: Record<string, string> = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className='flex items-center'>
      <Image
        src={bookerLogo}
        alt='B'
        className={`${heights[size]} object-contain`}
        width={50}
        height={50}
      />

      <span className={`text-white font-bold ${textSizes[size]} -ml-0.5 tracking-tight`}>
        ooker
      </span>
    </div>
  );
}

export default Logo;